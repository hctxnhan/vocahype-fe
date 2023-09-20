import { FirebaseError } from 'firebase/app';
import { Reducer, useCallback, useReducer } from 'react';

export enum ActionState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

interface State<T, E> {
  state: ActionState;
  error?: E;
  data?: T;
}

interface Action<T> {
  type: ActionState;
  data?: T;
}

export const reducer: Reducer<State<any, Error>, Action<any>> = <T, E>(
  state: State<T, E>,
  action: Action<T>
) => {
  switch (action.type) {
    case ActionState.LOADING:
      return { state: ActionState.LOADING };
    case ActionState.SUCCESS:
      return { state: ActionState.SUCCESS, data: action.data };
    case ActionState.ERROR:
      return { state: ActionState.ERROR, error: action.data };
    default:
      return state;
  }
};

export function useAsyncAction<
  T extends (...args: any[]) => Promise<unknown>,
  E extends Error = FirebaseError,
>(
  dispatch: T,
  options?: {
    onSuccess?: (data: Awaited<ReturnType<T>>) => Promise<void> | void;
    onError?: (message: E) => void;
  }
) {
  const [state, dispatchFn] = useReducer<typeof reducer>(reducer, {
    state: ActionState.IDLE,
  });

  const start = useCallback(
    (
      args?: Parameters<typeof dispatch>,
      fetchOptions: typeof options = options
    ) => {
      dispatchFn({ type: ActionState.LOADING });
      dispatch(...((args || []) as Parameters<T>))
        .then(data => {
          dispatchFn({ type: ActionState.SUCCESS, data });
          void fetchOptions?.onSuccess?.(data as Awaited<ReturnType<T>>);
        })
        .catch(error => {
          dispatchFn({
            type: ActionState.ERROR,
            data: error as E,
          });
          void fetchOptions?.onError?.(error as E);
        });
    },
    [dispatch, options]
  );

  return {
    ...state,
    start,
    isLoading: state.state === ActionState.LOADING,
  };
}
