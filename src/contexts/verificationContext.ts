import React, {Dispatch, ReducerAction} from 'react';

import {Principal} from '@dfinity/principal';
import {Verification as CanisterVerification} from '@psychedelic/cover';

import {Verification} from '@/models';
import {capitalize, coverSDK} from '@/utils';

import {ActionBase, createContext, createProvider} from './helper';

/*
 * ========================================================================================================
 * ACTION INTERFACES
 * ========================================================================================================
 */
type Action = FetchPendingAction | FetchVerificationsAction | FetchByCanisterIdAction;
interface FetchPendingAction extends ActionBase {
  type: 'fetchPending';
}
interface FetchVerificationsAction extends ActionBase {
  type: 'fetchVerifications';
  payload: {
    verifications: Verification[];
    atPage: number;
    totalPage: number;
  };
}
interface FetchByCanisterIdAction extends ActionBase {
  type: 'fetchByCanisterId';
  payload: {
    verifications: Verification[];
    currentCanisterId: string;
  };
}

/*
 * ========================================================================================================
 * STATE
 * ========================================================================================================
 */
interface State {
  verifications?: Verification[];
  atPage?: number;
  totalPage?: number;
  currentCanisterId?: string;
  disablePaginated?: boolean;
}
const INIT_STATE: State = {};

/*
 * ========================================================================================================
 * CONTEXT
 * ========================================================================================================
 */
const context = createContext<State, Action>(INIT_STATE);
export const useVerificationContext = () => React.useContext(context);

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
export const DEFAULT_VERIFICATIONS = Array<Verification>(ITEMS_PER_PAGE).fill({});

/*
 * ========================================================================================================
 * REDUCER
 * ========================================================================================================
 */
const verificationReducer = (_: State, action: Action): State => {
  switch (action.type) {
    case 'fetchPending': {
      return {verifications: DEFAULT_VERIFICATIONS, disablePaginated: true};
    }
    case 'fetchVerifications': {
      return {
        verifications: action.payload.verifications,
        atPage: action.payload.atPage,
        totalPage: action.payload.totalPage,
        disablePaginated: false
      };
    }
    case 'fetchByCanisterId': {
      return {
        verifications: action.payload.verifications,
        currentCanisterId: action.payload.currentCanisterId,
        disablePaginated: true
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
export const VerificationProvider = createProvider(context, verificationReducer, INIT_STATE);

/*
 * ========================================================================================================
 * ACTIONS
 * ========================================================================================================
 */
export const fetchVerifications = async (
  dispatch: Dispatch<ReducerAction<typeof verificationReducer>>,
  pageNum = 1
) => {
  dispatch({type: 'fetchPending'});
  try {
    const result = await coverSDK.getAllVerifications({
      page_index: BigInt(pageNum),
      items_per_page: BigInt(ITEMS_PER_PAGE)
    });
    dispatch({
      type: 'fetchVerifications',
      payload: {
        verifications: await mapFullVerification(result.data),
        atPage: pageNum,
        totalPage: parseInt(result.total_pages.toString(10), 10)
      }
    });
  } catch (e) {
    dispatch({type: 'fetchPending'});
  }
};

export const fetchByCanisterId = async (
  dispatch: Dispatch<ReducerAction<typeof verificationReducer>>,
  currentCanisterId: Principal
) => {
  dispatch({type: 'fetchPending'});
  try {
    const result = await coverSDK.getVerificationByCanisterId(currentCanisterId);
    dispatch({
      type: 'fetchByCanisterId',
      payload: {
        verifications: result ? await mapFullVerification([result]) : [],
        currentCanisterId: currentCanisterId.toText()
      }
    });
  } catch (e) {
    dispatch({type: 'fetchPending'});
  }
};

/*
 * ========================================================================================================
 * MAPPER
 * ========================================================================================================
 */
const mapPartialVerification = (data: CanisterVerification): Verification => ({
  canisterId: data.canister_id.toText(),
  name: data.canister_name,
  repo: data.repo_url,
  gitCommit: data.commit_hash,
  lastActivity: data.updated_at,
  ownerId: data.updated_by.toText(),
  repoVisibility: data.repo_visibility[0] && capitalize(data.repo_visibility[0]),
  rustVersion: data.rust_version[0],
  canisterType: data.canister_type[0] && Object.keys(data.canister_type[0])[0],
  dfxVersion: data.dfx_version,
  optimizeCount: String(data.optimize_count),
  buildWasmHash: data.wasm_hash[0],
  buildUrl: data.build_url[0]
});

const mapFullVerification = async (data: CanisterVerification[]): Promise<Verification[]> => {
  const aggregator = data.reduce(
    (acc, v) => {
      acc.verifications.push(mapPartialVerification(v));
      acc.hashPromises.push(coverSDK.getICHash(v.canister_id));
      return acc;
    },
    {verifications: [], hashPromises: []} as {
      verifications: Verification[];
      hashPromises: Promise<string | undefined>[];
    }
  );
  (await Promise.all(aggregator.hashPromises)).forEach((hash, i) => {
    aggregator.verifications[i].wasmHash = hash || 'N/A';
    aggregator.verifications[i].isVerified = hash === aggregator.verifications[i].buildWasmHash;
  });
  return aggregator.verifications;
};