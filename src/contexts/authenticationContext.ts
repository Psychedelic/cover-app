import {Dispatch, ReducerAction, useContext} from 'react';

import {getPlugAuthentication, getPlugPrincipalId, initPlugPersistenceData, plugConnect, plugDisconnect} from '@/utils';

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
type Action = FetchPendingAction | AuthenticationAction | LogOutAction;
interface FetchPendingAction extends ActionBase {
  type: 'fetchPending';
}
interface AuthenticationAction extends ActionBase {
  type: 'authenticationAction';
  payload: {
    isAuthenticated: boolean;
    pid?: string;
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
  isPending?: boolean;
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
        isPending: true,
        isAuthenticated: false
      };
    }
    case 'authenticationAction': {
      return {
        isAuthenticated: action.payload.isAuthenticated,
        pid: action.payload.pid,
        isPending: false
      };
    }
    case 'logOutAction': {
      return {
        isAuthenticated: false,
        isPending: false
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
  const {isAuthenticated, pid} = await getPlugAuthentication();
  dispatch({type: 'authenticationAction', payload: {isAuthenticated, pid}});
};

export const verifyPlugAuthentication = async (dispatch: Dispatch<ReducerAction<typeof authenticationReducer>>) => {
  dispatch({type: 'fetchPending'});
  const {isAuthenticated, pid} = await getPlugAuthentication();
  await initPlugPersistenceData(isAuthenticated, () => refetchAuthenticationState(dispatch));
  dispatch({type: 'authenticationAction', payload: {isAuthenticated, pid}});
};

export const authenticate = async (dispatch: Dispatch<ReducerAction<typeof authenticationReducer>>) => {
  dispatch({type: 'fetchPending'});
  try {
    await plugConnect();
    await initPlugPersistenceData(true, () => refetchAuthenticationState(dispatch));
    dispatch({type: 'authenticationAction', payload: {isAuthenticated: true, pid: getPlugPrincipalId()}});
  } catch (e) {
    dispatch({type: 'logOutAction'});
  }
};

export const logOut = (dispatch: Dispatch<ReducerAction<typeof authenticationReducer>>) => {
  plugDisconnect();
  dispatch({type: 'logOutAction'});
};
