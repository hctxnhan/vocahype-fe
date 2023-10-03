import { useSearchParams } from '@/lib/hooks/useSearchParams';

import { ResetPassword } from '../ResetPassword/components/ResetPassword';

enum AuthActionType {
  RESET_PASSWORD = 'resetPassword',
}

export function AuthAction() {
  const params = useSearchParams<{
    mode: AuthActionType;
    oobCode: string;
    apiKey: string;
  }>();

  switch (params.mode) {
    case AuthActionType.RESET_PASSWORD:
      if (params.apiKey && params.oobCode) {
        return (
          <ResetPassword apiKey={params.apiKey} oobCode={params.oobCode} />
        );
      }
      return <></>;
    default:
      return <></>;
  }
}
