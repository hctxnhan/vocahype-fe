import { Redirect } from 'wouter';

import { FillParent } from '@/components/layout/FillParent/FillParent';
import { Loading } from '@/components/layout/Loading/Loading';
import {
  AuthState,
  useAuthState,
} from '@/lib/hooks/firebase/auth/useAuthState';

export function ProtectedPage({ children }: React.PropsWithChildren) {
  const { authState } = useAuthState();

  if (authState === AuthState.SIGNED_OUT || authState === AuthState.ERROR) {
    return <Redirect to="/auth" />;
  }

  if (authState === AuthState.LOADING) {
    return (
      <FillParent>
        <Loading loadingText="Signing in..." />
      </FillParent>
    );
  }

  return <>{children}</>;
}
