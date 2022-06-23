import React, {Dispatch, ReducerAction} from 'react';

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
}
const INIT_STATE: State = {};

/*
 * ========================================================================================================
 * CONTEXT
 * ========================================================================================================
 */
const context = createContext<State, Action>(INIT_STATE);
export const useStatsContext = () => React.useContext(context);

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
const StatsReducer = (_: State, action: Action): State => {
  switch (action.type) {
    case 'fetchPending': {
      return {stats: DEFAULT_STATS};
    }
    case 'fetchStats': {
      return {
        stats: action.payload.stats
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
export const StatsProvider = createProvider(context, StatsReducer, INIT_STATE);

/*
 * ========================================================================================================
 * ACTIONS
 * ========================================================================================================
 */
export const fetchStats = async (dispatch: Dispatch<ReducerAction<typeof StatsReducer>>) => {
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
    dispatch({type: 'fetchPending'});
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
