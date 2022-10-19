import {Dispatch, ReducerAction, useContext} from 'react';

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
    isAuthenticated: boolean;
    pid: string;
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
        pid: action.payload.pid
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
export const verifyPlugAuthentication = async (dispatch: Dispatch<ReducerAction<typeof authenticationReducer>>) => {
  const isAuthenticated = await (window as any)?.ic?.plug?.isConnected();
  const pid = (window as any)?.ic?.plug?.sessionManager?.sessionData?.principalId;
  dispatch({type: 'authenticationAction', payload: {isAuthenticated, pid}});
};

export const authenticate = async (dispatch: Dispatch<ReducerAction<typeof authenticationReducer>>) => {
  const onConnectionUpdate = () => {
    const pid = (window as any)?.ic?.plug?.sessionManager?.sessionData?.principalId;
    dispatch({type: 'authenticationAction', payload: {isAuthenticated: true, pid}});
  };
  await (window as any)?.ic?.plug?.requestConnect({
    whitelist: ['iftvq-niaaa-aaaai-qasga-cai', '3x7en-uqaaa-aaaai-abgca-cai'],
    host: 'https://mainnet.dfinity.network',
    onConnectionUpdate
  });
  const pid = (window as any)?.ic?.plug?.sessionManager?.sessionData?.principalId;
  dispatch({type: 'authenticationAction', payload: {isAuthenticated: true, pid}});
};

export const logOut = (dispatch: Dispatch<ReducerAction<typeof authenticationReducer>>) => {
  (window as any)?.ic?.plug?.disconnect();
  dispatch({type: 'logOutAction'});
};
