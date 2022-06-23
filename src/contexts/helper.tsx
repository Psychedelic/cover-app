import React, {useCallback, useEffect, useMemo, useReducer, useRef} from 'react';

/*
 * ========================================================================================================
 * ACTION INTERFACES
 * ========================================================================================================
 */
export interface ActionBase<T = unknown> {
  type: string;
  payload?: T;
}

/*
 * ========================================================================================================
 * REDUCER
 * ========================================================================================================
 */
type Reducer<State, Action extends ActionBase> = (state: State, action: Action) => State;

/*
 * ========================================================================================================
 * CONTEXT
 * ========================================================================================================
 */
interface Context<State, Action extends ActionBase> {
  state: State;
  dispatch: (action: Action) => void;
}
export const createContext = <State, Action extends ActionBase>(state: State): React.Context<Context<State, Action>> =>
  React.createContext({
    state,
    dispatch: (action: Action) => {
      // Do nothing.
    }
  });

/*
 * ========================================================================================================
 * PROVIDER
 * ========================================================================================================
 */
export const createProvider =
  <State, Action extends ActionBase>(
    context: React.Context<Context<State, Action>>,
    reducer: Reducer<State, Action>,
    initState: State
  ): React.FC<React.PropsWithChildren<unknown>> =>
  ({children}) => {
    const isMounted = useRef<boolean | undefined>();
    const [state, dispatch] = useReducer(reducer, initState);
    useEffect(() => {
      isMounted.current = true;
      return () => {
        isMounted.current = false;
      };
    });
    const dispatchWrapper = useCallback((action: Action) => {
      isMounted.current !== false && dispatch(action);
    }, []);
    const value = useMemo(
      () => ({
        state,
        dispatch: dispatchWrapper
      }),
      [state, dispatchWrapper]
    );
    return <context.Provider value={value}>{children}</context.Provider>;
  };
