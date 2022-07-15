import {Dispatch, ReducerAction, useContext} from 'react';

import {Principal} from '@dfinity/principal';

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
export interface AuthenticationInfo {
  isAuthenticated?: boolean;
  pid?: Principal;
}
type Action = AuthenticationAction;
interface AuthenticationAction extends ActionBase {
  type: 'authenticationAction';
  payload: {
    pid: Principal;
  };
}

/*
 * ========================================================================================================
 * STATE
 * ========================================================================================================
 */
interface State {
  authenticationInfo?: AuthenticationInfo;
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
const authenticationReducer = (state: State, action: Action): State => {
  if (action.type === 'authenticationAction') {
    return {
      authenticationInfo: {
        isAuthenticated: true,
        pid: action.payload.pid
      }
    };
  }
  throw new Error(`Unhandled action type: ${(action as ActionBase).type}`);
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
export const authenticate = (dispatch: Dispatch<ReducerAction<typeof authenticationReducer>>, pid: Principal) => {
  dispatch({type: 'authenticationAction', payload: {pid}});
};
