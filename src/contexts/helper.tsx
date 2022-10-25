import {
  FC,
  PropsWithChildren,
  Context as ReactContext,
  createContext as reactCreateContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef
} from 'react';

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
export const createContext = <State, Action extends ActionBase>(state: State): ReactContext<Context<State, Action>> =>
  reactCreateContext({
    state,
    dispatch: (_: Action) => {
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
    context: ReactContext<Context<State, Action>>,
    reducer: Reducer<State, Action>,
    initState: State
  ): FC<PropsWithChildren<unknown>> =>
  ({children}) => {
    const isMountedRef = useRef<boolean | undefined>();
    const [state, dispatch] = useReducer(reducer, initState);
    useEffect(() => {
      isMountedRef.current = true;
      return () => {
        isMountedRef.current = false;
      };
    });
    const dispatchWrapper = useCallback((action: Action) => {
      isMountedRef.current !== false && dispatch(action);
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
