import { useRoute } from '@/lib/hooks/useSearchParams';

import { ResetPassword } from '../ResetPassword/components/ResetPassword';

enum AuthActionType {
  RESET_PASSWORD = 'resetPassword',
}

export function AuthAction() {
  const { params } = useRoute<{
    mode: AuthActionType;
    oobCode: string;
    apiKey: string;
  }>('/auth/action');

  switch (params.mode) {
    case AuthActionType.RESET_PASSWORD:
      return <ResetPassword apiKey={params.apiKey} oobCode={params.oobCode} />;
    default:
      return <></>
  }
}
