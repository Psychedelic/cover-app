import {Dispatch, ReducerAction, useContext} from 'react';

import {Stats as CanisterStats} from '@psychedelic/cover';

import {Stats} from '@/models';
import {coverSDK} from '@/utils';

import {ActionBase, createContext, createProvider} from './helper';

/*
 * ========================================================================================================
 * ACTION INTERFACES
 * ========================================================================================================
 */
type Action = FetchPendingAction | FetchStatsAction;
interface FetchPendingAction extends ActionBase {
  type: 'fetchPending';
}
interface FetchStatsAction extends ActionBase {
  type: 'fetchStats';
  payload: {
    stats: Stats;
  };
}

/*
 * ========================================================================================================
 * STATE
 * ========================================================================================================
 */
interface State {
  stats?: Stats;
  isFetching?: boolean;
}
const INIT_STATE: State = {};

/*
 * ========================================================================================================
 * CONTEXT
 * ========================================================================================================
 */
const context = createContext<State, Action>(INIT_STATE);
export const useStatsContext = () => useContext(context);

/*
 * ========================================================================================================
 * DEFAULT LOADING MASK
 * ========================================================================================================
 */
export const DEFAULT_STATS: Stats = {
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
const statsReducer = (_: State, action: Action): State => {
  switch (action.type) {
    case 'fetchPending': {
      return {stats: DEFAULT_STATS, isFetching: true};
    }
    case 'fetchStats': {
      return {
        stats: action.payload.stats,
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
export const StatsProvider = createProvider(context, statsReducer, INIT_STATE);

/*
 * ========================================================================================================
 * ACTIONS
 * ========================================================================================================
 */
export const fetchStats = async (dispatch: Dispatch<ReducerAction<typeof statsReducer>>) => {
  dispatch({type: 'fetchPending'});
  try {
    const canisterStats = await coverSDK.getVerificationStats();
    dispatch({
      type: 'fetchStats',
      payload: {
        stats: mapStats(canisterStats)
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
const mapStats = (data: CanisterStats): Stats => ({
  totalCanisters: data.total_canisters.toString(),
  motokoCanistersCount: data.motoko_canisters_count.toString(),
  rustCanistersCount: data.rust_canisters_count.toString(),
  buildSuccessCount: data.build_success_count.toString()
});
