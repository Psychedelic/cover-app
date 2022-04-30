import React, {Dispatch, ReducerAction, useMemo} from 'react';

import {Verification as CanisterVerification} from '@psychedelic/cover';

import {Verification} from '@/models';
import {capitalize, coverSDK} from '@/utils';

const loadingVerifications = Array<Verification>(18).fill({});

type Action = PendingFetchAction | FetchAction | GetByCanisterIdAction;

interface ActionBase<T = unknown> {
  type: string;
  payload?: T;
}

interface PendingFetchAction extends ActionBase {
  type: 'pendingFetch';
}
interface FetchAction extends ActionBase {
  type: 'fetch';
  payload: {
    verifications: Verification[];
    atPage: number;
    totalPage: number;
  };
}
interface GetByCanisterIdAction extends ActionBase {
  type: 'getByCanisterId';
}

interface State {
  verifications?: Verification[];
  atPage?: number;
  totalPage?: number;
}
interface Context {
  state: State;
  dispatch: (action: Action) => void;
}

const VerificationContext = React.createContext<Context>({state: {}, dispatch: () => {}});

const verificationReducer = (_: State, action: Action): State => {
  switch (action.type) {
    case 'pendingFetch': {
      return {verifications: loadingVerifications};
    }
    case 'fetch': {
      return {
        verifications: action.payload.verifications,
        atPage: action.payload.atPage,
        totalPage: action.payload.totalPage
      };
    }
    case 'getByCanisterId': {
      return {verifications: []};
    }
    default: {
      throw new Error(`Unhandled action type: ${(action as ActionBase).type}`);
    }
  }
};

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
    const aggregator = result.data.reduce(
      (data, v) => {
        data.verifications.push(mapVerification(v));
        data.hashPromises.push(coverSDK.getICHash(v.canister_id));
        return data;
      },
      {verifications: [], hashPromises: []} as {verifications: Verification[]; hashPromises: Promise<string>[]}
    );
    (await Promise.all(aggregator.hashPromises)).forEach((hash, i) => {
      aggregator.verifications[i].wasmHash = hash;
      aggregator.verifications[i].isVerified = hash === aggregator.verifications[i].buildWasmHash;
    });
    dispatch({
      type: 'fetch',
      payload: {
        verifications: aggregator.verifications,
        atPage: pageNum,
        totalPage: parseInt(result.total_pages.toString(10), 10)
      }
    });
  } catch (e) {
    dispatch({type: 'pendingFetch'});
  }
};

const mapVerification = (data: CanisterVerification): Verification => ({
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
