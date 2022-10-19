import {Dispatch, ReducerAction, useContext} from 'react';

import {_SERVICE as CoverActor} from '@psychedelic/cover';
import {idlFactory} from '@psychedelic/cover/lib/cjs/actor/idl/cover.did.js';

import {COVER_CANISTER_ID} from '@/constants';

import {ActionBase, createContext, createProvider} from './helper';

/*
 * ========================================================================================================
 * UTILS
 * ========================================================================================================
 */

/*
 * ========================================================================================================
 * ACTION INTERFACES
 * ========================================================================================================
 */
type Action = AuthenticationAction | LogOutAction;
interface AuthenticationAction extends ActionBase {
  type: 'authenticationAction';
  payload: {
    isAuthenticated?: boolean;
    pid?: string;
    plugCoverActor?: CoverActor;
  };
}
interface LogOutAction extends ActionBase {
  type: 'logOutAction';
}

/*
 * ========================================================================================================
 * STATE
 * ========================================================================================================
 */
interface State {
  isAuthenticated?: boolean;
  pid?: string;
  plugCoverActor?: CoverActor;
}
const INIT_STATE: State = {};

/*
 * ========================================================================================================
 * CONTEXT
 * ========================================================================================================
 */
const context = createContext<State, Action>(INIT_STATE);
export const useAuthenticationContext = () => useContext(context);

/*
 * ========================================================================================================
 * REDUCER
 * ========================================================================================================
 */
const authenticationReducer = (_: State, action: Action): State => {
  switch (action.type) {
    case 'authenticationAction': {
      return {
        isAuthenticated: action.payload.isAuthenticated,
        pid: action.payload.pid,
        plugCoverActor: action.payload.plugCoverActor
      };
    }
    case 'logOutAction': {
      return {
        isAuthenticated: false
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
export const AuthenticationProvider = createProvider(context, authenticationReducer, INIT_STATE);

/*
 * ========================================================================================================
 * ACTIONS
 * ========================================================================================================
 */
interface Plug {
  ic?: {
    plug?: {
      isConnected: () => Promise<boolean>;
      disconnect: () => Promise<void>;
      requestConnect: (opts: {whitelist: string[]; host: string; onConnectionUpdate: () => void}) => Promise<void>;
      createActor: (opts: {canisterId: string; interfaceFactory: unknown}) => Promise<CoverActor>;
      sessionManager?: {
        sessionData?: {
          principalId: string;
        };
      };
    };
  };
}

export const verifyPlugAuthentication = async (dispatch: Dispatch<ReducerAction<typeof authenticationReducer>>) => {
  const isAuthenticated = await (window as Plug)?.ic?.plug?.isConnected();
  const pid = (window as Plug)?.ic?.plug?.sessionManager?.sessionData?.principalId;
  const plugCoverActor = await (window as Plug)?.ic?.plug?.createActor({
    canisterId: COVER_CANISTER_ID,
    interfaceFactory: idlFactory
  });
  dispatch({type: 'authenticationAction', payload: {isAuthenticated, pid, plugCoverActor}});
};

export const authenticate = async (dispatch: Dispatch<ReducerAction<typeof authenticationReducer>>) => {
  const initAuthenticationState = async () => {
    const pid = (window as Plug)?.ic?.plug?.sessionManager?.sessionData?.principalId;
    const plugCoverActor = await (window as Plug)?.ic?.plug?.createActor({
      canisterId: COVER_CANISTER_ID,
      interfaceFactory: idlFactory
    });
    dispatch({type: 'authenticationAction', payload: {isAuthenticated: true, pid, plugCoverActor}});
  };
  await (window as Plug)?.ic?.plug?.requestConnect({
    whitelist: [COVER_CANISTER_ID],
    host: 'https://mainnet.dfinity.network',
    onConnectionUpdate: initAuthenticationState
  });
  initAuthenticationState();
};

export const logOut = (dispatch: Dispatch<ReducerAction<typeof authenticationReducer>>) => {
  (window as Plug)?.ic?.plug?.disconnect();
  dispatch({type: 'logOutAction'});
};
