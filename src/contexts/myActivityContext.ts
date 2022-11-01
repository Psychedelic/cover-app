import {Dispatch, ReducerAction, useContext} from 'react';

import {MyActivity as CanisterMyActivity} from '@psychedelic/cover';

import {MyActivity} from '@/models';
import {getPlugCoverActor} from '@/utils';

import {ActionBase, createContext, createProvider} from './helper';

/*
 * ========================================================================================================
 * ACTION INTERFACES
 * ========================================================================================================
 */
type Action = FetchPendingAction | FetchMyActivitiesAction;
interface FetchPendingAction extends ActionBase {
  type: 'fetchPending';
}
interface FetchMyActivitiesAction extends ActionBase {
  type: 'fetchMyActivities';
  payload: {
    myActivities: MyActivity[];
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
  myActivities?: MyActivity[];
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
export const useMyActivityContext = () => useContext(context);

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
export const DEFAULT_MY_ACTIVITIES = Array<MyActivity>(ITEMS_PER_PAGE).fill({});

/*
 * ========================================================================================================
 * REDUCER
 * ========================================================================================================
 */
const myActivityReducer = (_: State, action: Action): State => {
  switch (action.type) {
    case 'fetchPending': {
      return {myActivities: DEFAULT_MY_ACTIVITIES, disablePaginated: true};
    }
    case 'fetchMyActivities': {
      return {
        myActivities: action.payload.myActivities,
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
export const MyActivityProvider = createProvider(context, myActivityReducer, INIT_STATE);

/*
 * ========================================================================================================
 * ACTIONS
 * ========================================================================================================
 */
export const fetchMyActivities = async (dispatch: Dispatch<ReducerAction<typeof myActivityReducer>>, pageNum = 1) => {
  dispatch({type: 'fetchPending'});
  try {
    const result = await getPlugCoverActor().getMyActivities({
      page_index: BigInt(pageNum),
      items_per_page: BigInt(ITEMS_PER_PAGE)
    });
    dispatch({
      type: 'fetchMyActivities',
      payload: {
        myActivities: result.data.map(mapMyActivity),
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
const mapMyActivity = (data: CanisterMyActivity): MyActivity => ({
  canisterId: data.canister_id.toText(),
  buildStatus: data.build_status[0] && Object.keys(data.build_status[0])[0] as 'Success' | 'Pending' | 'Error' | 'Building',
  buildConfigStatus: data.build_config_status[0] && Object.keys(data.build_config_status[0])[0] as 'Save' | 'Delete',
  datetime: new Date(Number(data.created_at / BigInt(1_000_000)))
});
