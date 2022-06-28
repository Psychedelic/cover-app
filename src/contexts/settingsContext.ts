import {Dispatch, ReducerAction, useContext} from 'react';

import {ActionBase, createContext, createProvider} from './helper';

/*
 * ========================================================================================================
 * UTILS
 * ========================================================================================================
 */
const saveCoverSettings = (coverSettings: CoverSettings) => {
  localStorage.setItem('cover_settings', JSON.stringify(coverSettings));
};
const loadCoverSettings = (): CoverSettings =>
  JSON.parse(localStorage.getItem('cover_settings') || '{"isAutoRefresh":true,"refreshInterval":"1"}');

/*
 * ========================================================================================================
 * ACTION INTERFACES
 * ========================================================================================================
 */
export interface CoverSettings {
  isAutoRefresh: boolean;
  refreshInterval: string;
}
type Action = SetCoverSettingsAction;
interface SetCoverSettingsAction extends ActionBase {
  type: 'setCoverSettings';
  payload: {
    coverSettings: CoverSettings;
  };
}

/*
 * ========================================================================================================
 * STATE
 * ========================================================================================================
 */
interface State {
  coverSettings: CoverSettings;
}
const INIT_STATE: State = {coverSettings: loadCoverSettings() || {isAutoRefresh: true, refreshInterval: '1'}};

/*
 * ========================================================================================================
 * CONTEXT
 * ========================================================================================================
 */
const context = createContext<State, Action>(INIT_STATE);
export const useCoverSettingsContext = () => useContext(context);

/*
 * ========================================================================================================
 * REDUCER
 * ========================================================================================================
 */
const coverSettingsReducer = (_: State, action: Action): State => {
  if (action.type === 'setCoverSettings') {
    return {
      coverSettings: action.payload.coverSettings
    };
  }
  throw new Error(`Unhandled action type: ${(action as ActionBase).type}`);
};

/*
 * ========================================================================================================
 * PROVIDER
 * ========================================================================================================
 */
export const CoverSettingsProvider = createProvider(context, coverSettingsReducer, INIT_STATE);

/*
 * ========================================================================================================
 * ACTIONS
 * ========================================================================================================
 */
export const setCoverSettings = (
  coverSettings: CoverSettings,
  dispatch: Dispatch<ReducerAction<typeof coverSettingsReducer>>
) => {
  saveCoverSettings(coverSettings);
  dispatch({
    type: 'setCoverSettings',
    payload: {
      coverSettings
    }
  });
};
