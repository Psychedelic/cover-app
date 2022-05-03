import React, {Dispatch, ReducerAction, useMemo} from 'react';

import {Principal} from '@dfinity/principal';
import {Verification as CanisterVerification} from '@psychedelic/cover';

import {Verification} from '@/models';
import {capitalize, coverSDK} from '@/utils';

type Action = PendingFetchAction | FetchVerificationsAction | FetchByCanisterIdAction;
interface ActionBase<T = unknown> {
  type: string;
  payload?: T;
}
interface PendingFetchAction extends ActionBase {
  type: 'pendingFetch';
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
interface State {
  verifications?: Verification[];
  atPage?: number;
  totalPage?: number;
  currentCanisterId?: string;
}
interface Context {
  state: State;
  dispatch: (action: Action) => void;
}

const loadingVerifications = Array<Verification>(18).fill({});

const verificationReducer = (_: State, action: Action): State => {
  switch (action.type) {
    case 'pendingFetch': {
      return {verifications: loadingVerifications};
    }
    case 'fetchVerifications': {
      return {
        verifications: action.payload.verifications,
        atPage: action.payload.atPage,
        totalPage: action.payload.totalPage
      };
    }
    case 'fetchByCanisterId': {
      return {
        verifications: action.payload.verifications,
        currentCanisterId: action.payload.currentCanisterId
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${(action as ActionBase).type}`);
    }
  }
};

const VerificationContext = React.createContext<Context>({state: {}, dispatch: () => {}});

export const VerificationProvider: React.FC = ({children}) => {
  const [state, dispatch] = React.useReducer(verificationReducer, {});
  const value = useMemo(() => ({state, dispatch}), [state]);
  return <VerificationContext.Provider value={value}>{children}</VerificationContext.Provider>;
};

export const useVerificationContext = () => React.useContext(VerificationContext);

export const fetchVerifications = async (
  dispatch: Dispatch<ReducerAction<typeof verificationReducer>>,
  pageNum = 1
) => {
  dispatch({type: 'pendingFetch'});
  try {
    const result = await coverSDK.getAllVerifications({
      page_index: BigInt(pageNum),
      items_per_page: BigInt(18)
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
    dispatch({type: 'pendingFetch'});
  }
};

export const fetchByCanisterId = async (
  dispatch: Dispatch<ReducerAction<typeof verificationReducer>>,
  currentCanisterId: Principal
) => {
  dispatch({type: 'pendingFetch'});
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
    dispatch({type: 'pendingFetch'});
  }
};

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
    {verifications: [], hashPromises: []} as {verifications: Verification[]; hashPromises: Promise<string>[]}
  );
  (await Promise.all(aggregator.hashPromises)).forEach((hash, i) => {
    aggregator.verifications[i].wasmHash = hash;
    aggregator.verifications[i].isVerified = hash === aggregator.verifications[i].buildWasmHash;
  });
  return aggregator.verifications;
};
