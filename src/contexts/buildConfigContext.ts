import {Dispatch, ReducerAction, useContext} from 'react';

import {Principal} from '@dfinity/principal';
import {BuildConfig as CanisterBuildConfig, Verification as CanisterVerification} from '@psychedelic/cover';

import {BuildConfig} from '@/models';
import {capitalize, coverSDK, getPlugCoverActor} from '@/utils';

import {ActionBase, createContext, createProvider} from './helper';

/*
 * ========================================================================================================
 * ACTION INTERFACES
 * ========================================================================================================
 */
type Action =
  | FetchPendingAction
  | FetchBuildConfigsAction
  | FetchBuildConfigByCanisterIdAction
  | DeleteBuildConfigAction;
interface FetchPendingAction extends ActionBase {
  type: 'fetchPending';
}
interface FetchBuildConfigsAction extends ActionBase {
  type: 'fetchBuildConfigs';
  payload: {
    buildConfigs: BuildConfig[];
  };
}
interface FetchBuildConfigByCanisterIdAction extends ActionBase {
  type: 'fetchBuildConfigByCanisterId';
  payload: {
    buildConfigs: BuildConfig[];
    currentCanisterId: string;
  };
}
interface DeleteBuildConfigAction extends ActionBase {
  type: 'deleteBuildConfig';
}

/*
 * ========================================================================================================
 * STATE
 * ========================================================================================================
 */
interface State {
  buildConfigs?: BuildConfig[];
  currentCanisterId?: string;
  isFetching?: boolean;
  pendingFetchCount: number;
}
const INIT_STATE: State = {pendingFetchCount: 0};

/*
 * ========================================================================================================
 * CONTEXT
 * ========================================================================================================
 */
const context = createContext<State, Action>(INIT_STATE);
export const useBuildConfigContext = () => useContext(context);

/*
 * ========================================================================================================
 * DEFAULT PAGE SIZE
 * ========================================================================================================
 */
const ITEMS_PER_PAGE = 18;

/*
 * ========================================================================================================
 * DEFAULT LOADING MASK
 * ========================================================================================================
 */
export const DEFAULT_BUILD_CONFIGS = Array<BuildConfig>(ITEMS_PER_PAGE).fill({});

/*
 * ========================================================================================================
 * REDUCER
 * ========================================================================================================
 */
const buildConfigReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'fetchPending': {
      return {
        buildConfigs: DEFAULT_BUILD_CONFIGS,
        isFetching: true,
        pendingFetchCount: state.pendingFetchCount + 1
      };
    }
    case 'fetchBuildConfigs': {
      const pendingFetchCount = state.pendingFetchCount - 1;
      const isFetching = pendingFetchCount > 0;
      return {
        buildConfigs: isFetching ? DEFAULT_BUILD_CONFIGS : action.payload.buildConfigs,
        isFetching,
        pendingFetchCount
      };
    }
    case 'fetchBuildConfigByCanisterId': {
      const pendingFetchCount = state.pendingFetchCount - 1;
      const isFetching = pendingFetchCount > 0;
      return {
        buildConfigs: isFetching ? DEFAULT_BUILD_CONFIGS : action.payload.buildConfigs,
        currentCanisterId: action.payload.currentCanisterId,
        isFetching,
        pendingFetchCount
      };
    }
    case 'deleteBuildConfig': {
      const pendingFetchCount = state.pendingFetchCount - 1;
      const isFetching = pendingFetchCount > 0;
      return {
        isFetching,
        pendingFetchCount
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${(action as ActionBase).type}`);
    }
  }
};

/*
 * ========================================================================================================
 * PROVIDER
 * ========================================================================================================
 */
export const BuildConfigProvider = createProvider(context, buildConfigReducer, INIT_STATE);

/*
 * ========================================================================================================
 * ACTIONS
 * ========================================================================================================
 */
export const fetchBuildConfigs = async (dispatch: Dispatch<ReducerAction<typeof buildConfigReducer>>) => {
  dispatch({type: 'fetchPending'});
  try {
    const result = await getPlugCoverActor().getBuildConfigs();
    dispatch({
      type: 'fetchBuildConfigs',
      payload: {
        buildConfigs: await mapFullBuildConfig(result)
      }
    });
  } catch (e) {
    console.error(e);
    dispatch({type: 'fetchPending'});
  }
};

export const fetchBuildConfigByCanisterId = async (
  dispatch: Dispatch<ReducerAction<typeof buildConfigReducer>>,
  currentCanisterId: Principal
) => {
  dispatch({type: 'fetchPending'});
  try {
    const result = await getPlugCoverActor().getBuildConfigById(currentCanisterId);
    dispatch({
      type: 'fetchBuildConfigByCanisterId',
      payload: {
        buildConfigs: result ? await mapFullBuildConfig(result) : [],
        currentCanisterId: currentCanisterId.toText()
      }
    });
  } catch (e) {
    console.error(e);
    dispatch({type: 'fetchPending'});
  }
};

export const deleteBuildConfig = async (
  dispatch: Dispatch<ReducerAction<typeof buildConfigReducer>>,
  canisterId: Principal
) => {
  dispatch({type: 'fetchPending'});
  try {
    await getPlugCoverActor().deleteBuildConfig(canisterId);
    dispatch({type: 'deleteBuildConfig'});
  } catch (e) {
    console.error(e);
    dispatch({type: 'fetchPending'});
  }
};

/*
 * ========================================================================================================
 * MAPPER
 * ========================================================================================================
 */
const mapPartialBuildConfig = (data: CanisterBuildConfig): BuildConfig => ({
  canisterId: data.canister_id.toText(),
  name: data.canister_name,
  repo: data.repo_url,
  gitCommit: data.commit_hash,
  lastActivity: new Date(Number(data.updated_at / BigInt(1_000_000))),
  callerId: data.caller_id.toText(),
  delegateCanisterId: data.delegate_canister_id[0] && data.delegate_canister_id[0].toText(),
  rustVersion: data.rust_version[0],
  dfxVersion: data.dfx_version,
  optimizeCount: String(data.optimize_count)
});

const mapFullBuildConfig = async (data: CanisterBuildConfig[]): Promise<BuildConfig[]> => {
  const aggregator = data.reduce(
    (acc, v) => {
      acc.buildConfigs.push(mapPartialBuildConfig(v));
      acc.hashPromises.push(coverSDK.getICHash(v.canister_id));
      acc.lastBuildPromises.push(coverSDK.getVerificationByCanisterId(v.canister_id));
      return acc;
    },
    {buildConfigs: [], hashPromises: [], lastBuildPromises: []} as {
      buildConfigs: BuildConfig[];
      hashPromises: Promise<string | undefined>[];
      lastBuildPromises: Promise<CanisterVerification | undefined>[];
    }
  );
  (await Promise.all(aggregator.lastBuildPromises)).forEach((verification, i) => {
    aggregator.buildConfigs[i].lastBuildWasmHash = verification?.wasm_hash[0];
    aggregator.buildConfigs[i].lastBuildUrl = verification?.build_url[0];
    aggregator.buildConfigs[i].lastBuildStatus = verification && Object.keys(verification.build_status)[0];
    aggregator.buildConfigs[i].lastBuildRepoVisibility = verification && capitalize(verification.repo_visibility);
    aggregator.buildConfigs[i].lastBuildCanisterType =
      verification && verification.canister_type[0] && Object.keys(verification.canister_type[0])[0];
  });
  (await Promise.all(aggregator.hashPromises)).forEach((hash, i) => {
    aggregator.buildConfigs[i].wasmHash = hash || 'N/A';
    aggregator.buildConfigs[i].isVerified = hash === aggregator.buildConfigs[i].lastBuildWasmHash;
  });
  return aggregator.buildConfigs;
};
