import { ErrorFn, User, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

import { auth } from '@/lib/configs/firebase';

export enum AuthState {
  SIGNED_IN = 'SIGNED_IN',
  SIGNED_OUT = 'SIGNED_OUT',
  ERROR = 'ERROR',
  LOADING = 'LOADING',
}

interface UseAuthStateReturned {
  user: User | null;
  authState: AuthState;
  error: Error | null;
}

interface UseAuthStateParams {
  options?: {
    onAuthStateChanged?: (user: User | null) => void;
  };
}

export function useAuthState(
  params?: UseAuthStateParams
): UseAuthStateReturned {
  const [user, setUser] = useState<User | null>(null);
  const [authState, setAuthState] = useState<AuthState>(AuthState.LOADING);
  const [error, setError] = useState<Error | null>(null);

  const onError: ErrorFn = (error: Error) => {
    setError(error);
    setAuthState(AuthState.ERROR);
  };

  useEffect(() => {
    const listener = onAuthStateChanged(
      auth,
      user => {
        try {
          params?.options?.onAuthStateChanged?.(user);
          if (user) setAuthState(AuthState.SIGNED_IN);
          else setAuthState(AuthState.SIGNED_OUT);
        } catch (e) {
          setError(e as Error);
          setAuthState(AuthState.ERROR);
        }
        setUser(user);
      },
      onError
    );

    return () => {
      listener();
    };
  }, [params?.options]);

  return {
    user,
    authState,
    error,
  };
}
