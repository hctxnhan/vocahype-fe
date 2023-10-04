import { checkActionCode } from 'firebase/auth';
import { useEffect } from 'react';
import { navigate } from 'wouter/use-location';

import { auth } from '@/lib/configs/firebase';
import { useAsyncAction } from '@/lib/hooks/useAsyncAction';
import { useSearchParams } from '@/lib/hooks/useSearchParams';
import { useToast } from '@/lib/hooks/useToast';

import { ResetPassword } from '../ResetPassword/components/ResetPassword';
import { VerifiedEmail } from '../VerifiedEmail.tsx/VerifiedEmail';

enum AuthActionType {
  RESET_PASSWORD = 'resetPassword',
  VERIFY_EMAIL = 'verifyEmail',
  RECOVER_EMAIL = 'recoverEmail',
}

export function AuthAction() {
  const params = useSearchParams<{
    mode: AuthActionType;
    oobCode: string;
    apiKey: string;
  }>();
  const {start, isLoading} = useAsyncAction(checkActionCode, {
    onError: handleError,
  })
  const toast = useToast();

  useEffect(() => {
    if(!params.oobCode || !params.apiKey) {
      return handleError();
    }

    start([auth, params.oobCode]);
  }, []);

  function handleError() {
    toast.error({
      title: 'Invalid URL',
      msg: 'Your URL is invalid due to expired or incorrect. Please try again.',
    });

    return navigate('/auth', {
      replace: true,
    });
  }

  if(isLoading || !params.oobCode || !params.apiKey) {
    return <></>;
  }

  switch (params.mode) {
    case AuthActionType.RESET_PASSWORD:
      return <ResetPassword apiKey={params.apiKey} oobCode={params.oobCode} />;
    case AuthActionType.VERIFY_EMAIL:
    case AuthActionType.RECOVER_EMAIL:
      return <VerifiedEmail oobCode={params.oobCode} />;
    default:
      return <></>;
  }
}
