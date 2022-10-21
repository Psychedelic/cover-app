import {Dispatch, ReducerAction, useContext} from 'react';

import {Activity as CanisterActivity} from '@psychedelic/cover';

import {Activity} from '@/models';
import {coverSDK} from '@/utils';

import {ActionBase, createContext, createProvider} from './helper';

/*
 * ========================================================================================================
 * ACTION INTERFACES
 * ========================================================================================================
 */
type Action = FetchPendingAction | FetchActivitiesAction;
interface FetchPendingAction extends ActionBase {
  type: 'fetchPending';
}
interface FetchActivitiesAction extends ActionBase {
  type: 'fetchActivities';
  payload: {
    activities: Activity[];
    atPage: number;
    totalPage: number;
  };
}

/*
 * ========================================================================================================
 * STATE
 * ========================================================================================================
 */
interface State {
  activities?: Activity[];
  atPage?: number;
  totalPage?: number;
  disablePaginated?: boolean;
}
const INIT_STATE: State = {};

/*
 * ========================================================================================================
 * CONTEXT
 * ========================================================================================================
 */
const context = createContext<State, Action>(INIT_STATE);
export const useActivityContext = () => useContext(context);

/*
 * ========================================================================================================
 * DEFAULT PAGE SIZE
 * ========================================================================================================
 */
const ITEMS_PER_PAGE = 12;

/*
 * ========================================================================================================
 * DEFAULT LOADING MASK
 * ========================================================================================================
 */
export const DEFAULT_ACTIVITIES = Array<Activity>(ITEMS_PER_PAGE).fill({});

/*
 * ========================================================================================================
 * REDUCER
 * ========================================================================================================
 */
const activityReducer = (_: State, action: Action): State => {
  switch (action.type) {
    case 'fetchPending': {
      return {activities: DEFAULT_ACTIVITIES, disablePaginated: true};
    }
    case 'fetchActivities': {
      return {
        activities: action.payload.activities,
        atPage: action.payload.atPage,
        totalPage: action.payload.totalPage,
        disablePaginated: false
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
export const ActivityProvider = createProvider(context, activityReducer, INIT_STATE);

/*
 * ========================================================================================================
 * ACTIONS
 * ========================================================================================================
 */
export const fetchActivities = async (dispatch: Dispatch<ReducerAction<typeof activityReducer>>, pageNum = 1) => {
  dispatch({type: 'fetchPending'});
  try {
    const result = await coverSDK.getActivities({
      page_index: BigInt(pageNum),
      items_per_page: BigInt(ITEMS_PER_PAGE)
    });
    dispatch({
      type: 'fetchActivities',
      payload: {
        activities: result.data.map(mapActivity),
        atPage: pageNum,
        totalPage: parseInt(result.total_pages.toString(10), 10)
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
const mapActivity = (data: CanisterActivity): Activity => ({
  canisterId: data.canister_id.toText(),
  buildStatus: Object.keys(data.build_status)[0] as 'Success' | 'Pending' | 'Error' | 'Building',
  datetime: new Date(Number(data.created_at / BigInt(1_000_000)))
});
