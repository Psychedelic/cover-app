import {Dispatch, ReducerAction, useContext} from 'react';

import {Stats as CanisterStats} from '@psychedelic/cover';

import {Stats} from '@/models';
import {getPlugCoverActor} from '@/utils';

import {ActionBase, createContext, createProvider} from './helper';

/*
 * ========================================================================================================
 * ACTION INTERFACES
 * ========================================================================================================
 */
type Action = FetchPendingAction | FetchMyStatsAction;
interface FetchPendingAction extends ActionBase {
  type: 'fetchPending';
}
interface FetchMyStatsAction extends ActionBase {
  type: 'fetchMyStats';
  payload: {
    myStats: Stats;
  };
}

/*
 * ========================================================================================================
 * STATE
 * ========================================================================================================
 */
interface State {
  myStats?: Stats;
  isFetching?: boolean;
}
const INIT_STATE: State = {};

/*
 * ========================================================================================================
 * CONTEXT
 * ========================================================================================================
 */
const context = createContext<State, Action>(INIT_STATE);
export const useMyStatsContext = () => useContext(context);

/*
 * ========================================================================================================
 * DEFAULT LOADING MASK
 * ========================================================================================================
 */
export const DEFAULT_MY_STATS: Stats = {
  totalCanisters: 'N/A',
  motokoCanistersCount: 'N/A',
  rustCanistersCount: 'N/A',
  buildSuccessCount: 'N/A'
};

/*
 * ========================================================================================================
 * REDUCER
 * ========================================================================================================
 */
const myStatsReducer = (_: State, action: Action): State => {
  switch (action.type) {
    case 'fetchPending': {
      return {myStats: DEFAULT_MY_STATS, isFetching: true};
    }
    case 'fetchMyStats': {
      return {
        myStats: action.payload.myStats,
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
export const MyStatsProvider = createProvider(context, myStatsReducer, INIT_STATE);

/*
 * ========================================================================================================
 * ACTIONS
 * ========================================================================================================
 */
export const fetchMyStats = async (dispatch: Dispatch<ReducerAction<typeof myStatsReducer>>) => {
  dispatch({type: 'fetchPending'});
  try {
    const canisterMyStats = await getPlugCoverActor().getMyVerificationStats();
    dispatch({
      type: 'fetchMyStats',
      payload: {
        myStats: mapMyStats(canisterMyStats)
      }
    });
  } catch (e) {
    console.error(e);
  }
};

/*
 * ========================================================================================================
 * MAPPER
 * ========================================================================================================
 */
const mapMyStats = (data: CanisterStats): Stats => ({
  totalCanisters: data.total_canisters.toString(),
  motokoCanistersCount: data.motoko_canisters_count.toString(),
  rustCanistersCount: data.rust_canisters_count.toString(),
  customCanistersCount: data.custom_canisters_count.toString(),
  assetsCanisterCount: data.assets_canisters_count.toString(),
  unknownCanistersCount: data.unknown_canisters_count.toString(),
  buildSuccessCount: data.build_success_count.toString()
});
