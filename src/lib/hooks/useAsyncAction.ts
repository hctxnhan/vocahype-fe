import { FirebaseError } from 'firebase/app';
import { useCallback, useEffect, useReducer, useRef } from 'react';

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

interface Action<T, E = FirebaseError> {
  type: ActionState;
  data?: T | E;
}

export const reducer = <T, E>(state: State<T, E>, action: Action<T, E>) => {
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
    autoStart?: boolean;
  }
) {
  const [state, dispatchFn] = useReducer<typeof reducer>(reducer, {
    state: ActionState.IDLE,
  }) as [State<Awaited<ReturnType<T>>, E>, (action: Action<T, E>) => void];
  const hasCanceled = useRef(false);

  const start = useCallback(
    (
      args?: Parameters<typeof dispatch>,
      fetchOptions: typeof options = options
    ) => {
      dispatchFn({ type: ActionState.LOADING });
      dispatch(...((args || []) as Parameters<T>))
        .then(data => {
          dispatchFn({
            type: ActionState.SUCCESS,
            data: data as T | E,
          });

          if (hasCanceled.current) return;
          void fetchOptions?.onSuccess?.(data as Awaited<ReturnType<T>>);
        })
        .catch(error => {
          dispatchFn({
            type: ActionState.ERROR,
            data: error as E,
          });
          
          if (hasCanceled.current) return;
          void fetchOptions?.onError?.(error as E);
        })
        .finally(() => {
          hasCanceled.current = false;
        });
    },
    [dispatch, options]
  );

  useEffect(() => {
    if (options?.autoStart) {
      start();
    }

    return () => {
      hasCanceled.current = true;
    };
  }, []);

  return {
    ...state,
    start,
    isLoading: state.state === ActionState.LOADING,
  };
}
