import { FillParent } from '@/components/layout/FillParent/FillParent';
import { useAuthState } from '@/lib/hooks/firebase/auth/useAuthState';

export function AuthenticateWelcomePage() {
  const { user } = useAuthState();

  return (
    !!user && (
      <FillParent className="center text-center">
        <div className="global-background absolute inset-0 -z-50" />
        <p className="text-xl font-medium text-slate-800">Welcome back,</p>
        <h1 className="mt-3 font-display text-5xl font-bold italic">
          {user?.displayName}
        </h1>
      </FillParent>
    )
  );
}
