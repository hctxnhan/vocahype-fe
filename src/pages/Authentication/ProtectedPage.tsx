import {
  AuthState,
  useAuthState,
} from '@/lib/hooks/firebase/auth/useAuthState';
import { Redirect } from 'wouter';

export function ProtectedPage({ children }: React.PropsWithChildren) {
  const { authState } = useAuthState();

  if (authState === AuthState.SIGNED_OUT || authState === AuthState.ERROR) {
    return <Redirect to="/auth" />;
  }

  return <>{children}</>;
}
