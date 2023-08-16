import {
  AuthState,
  useAuthState,
} from '@/lib/hooks/firebase/auth/useAuthState';
import { Redirect } from 'wouter';

export function PublicPage({ children }: React.PropsWithChildren) {
  const { authState } = useAuthState();

  if (authState === AuthState.SIGNED_IN) {
    return <Redirect to="/" />;
  }

  return <>{children}</>;
}
