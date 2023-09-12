import { FillParent } from '@/components/layout/FillParent/FillParent';
import { useAuthState } from '@/lib/hooks/firebase/auth/useAuthState';

export function AuthenticateWelcomePage() {
  const { user } = useAuthState();

  return (
    !!user && (
      <FillParent className="center text-center">
        <div className="absolute inset-0 -z-50 bg-sky-500/80" />
        <p className="text-xl font-medium text-sky-50">Welcome back,</p>
        <h1 className="mt-3 font-display text-xl font-bold italic text-sky-50">
          {user?.displayName}
        </h1>
      </FillParent>
    )
  );
}
