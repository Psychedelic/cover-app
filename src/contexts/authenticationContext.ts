import {Dispatch, ReducerAction, useContext} from 'react';

import {getPlugAuthentication, getPlugPrincipalId, initPlugPersistenceData, plugConnect, plugDisconnect} from '@/utils';

import {ActionBase, createContext, createProvider} from './helper';

/*
 * ========================================================================================================
 * UTILS
 * ========================================================================================================
 */
const toHex = (bytes?: Uint8Array) => bytes?.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');

/*
 * ========================================================================================================
 * ACTION INTERFACES
 * ========================================================================================================
 */
type Action = FetchPendingAction | AuthenticationAction | LogOutAction;
interface FetchPendingAction extends ActionBase {
  type: 'fetchPending';
}
interface AuthenticationAction extends ActionBase {
  type: 'authenticationAction';
  payload: {
    isAuthenticated: boolean;
    pid?: string;
    publicKey?: string;
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
  isFetching?: boolean;
  publicKey?: string;
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
    case 'fetchPending': {
      return {
        isFetching: true,
        isAuthenticated: false
      };
    }
    case 'authenticationAction': {
      return {
        isAuthenticated: action.payload.isAuthenticated,
        pid: action.payload.pid,
        publicKey: action.payload.publicKey,
        isFetching: false
      };
    }
    case 'logOutAction': {
      return {
        isAuthenticated: false,
        isFetching: false
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
const refetchAuthenticationState = async (dispatch: Dispatch<ReducerAction<typeof authenticationReducer>>) => {
  dispatch({type: 'fetchPending'});
  const {isAuthenticated, pid, publicKey} = await getPlugAuthentication();
  dispatch({type: 'authenticationAction', payload: {publicKey: toHex(publicKey?.rawKey.data), isAuthenticated, pid}});
};

export const verifyPlugAuthentication = async (dispatch: Dispatch<ReducerAction<typeof authenticationReducer>>) => {
  dispatch({type: 'fetchPending'});
  const {isAuthenticated, pid, publicKey} = await getPlugAuthentication();
  await initPlugPersistenceData(isAuthenticated, () => refetchAuthenticationState(dispatch));
  dispatch({type: 'authenticationAction', payload: {publicKey: toHex(publicKey?.rawKey.data), isAuthenticated, pid}});
};

export const authenticate = async (dispatch: Dispatch<ReducerAction<typeof authenticationReducer>>) => {
  dispatch({type: 'fetchPending'});
  try {
    const publicKey = await plugConnect();
    await initPlugPersistenceData(true, () => refetchAuthenticationState(dispatch));
    dispatch({
      type: 'authenticationAction',
      payload: {publicKey: toHex(publicKey.rawKey.data), isAuthenticated: true, pid: getPlugPrincipalId()}
    });
  } catch (_) {
    plugDisconnect();
    dispatch({type: 'logOutAction'});
  }
};

export const logOut = (dispatch: Dispatch<ReducerAction<typeof authenticationReducer>>) => {
  plugDisconnect();
  dispatch({type: 'logOutAction'});
};
