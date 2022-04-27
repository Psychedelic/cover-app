import React, {useMemo} from 'react';

import {Verification} from '@/models';

const loadingVerifications = Array<Verification>(18).fill({});

type Action = PendingFetchAction | FetchAction | GetByCanisterIdAction;

interface ActionBse<T = unknown> {
  type: string;
  payload?: T;
}

interface PendingFetchAction extends ActionBse {
  type: 'pendingFetch';
}
interface FetchAction extends ActionBse {
  type: 'fetch';
}
interface GetByCanisterIdAction extends ActionBse {
  type: 'getByCanisterId';
}

interface State {
  verifications?: Verification[];
}

interface Context {
  state: State;
  dispatch: (action: Action) => void;
}

const VerificationContext = React.createContext<Context>({state: {}, dispatch: () => {}});

const verificationReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'pendingFetch': {
      return {verifications: loadingVerifications};
    }
    case 'fetch': {
      return {verifications: []};
    }
    case 'getByCanisterId': {
      return {verifications: []};
    }
    default: {
      throw new Error(`Unhandled action type: ${(action as ActionBse).type}`);
    }
  }
};

export const VerificationProvider: React.FC = ({children}) => {
  const [state, dispatch] = React.useReducer(verificationReducer, {});
  const value = useMemo(() => ({state, dispatch}), [state]);
  return <VerificationContext.Provider value={value}>{children}</VerificationContext.Provider>;
};

export const useVerificationContext = () => React.useContext(VerificationContext);
