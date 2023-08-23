import { Redirect } from 'wouter';

import {
  AuthState,
  useAuthState,
} from '@/lib/hooks/firebase/auth/useAuthState';

export function PublicPage({ children }: React.PropsWithChildren) {
  const { authState } = useAuthState();

  if (authState === AuthState.SIGNED_IN) {
    return <Redirect to="/" />;
  }

  return <>{children}</>;
}
