import { applyActionCode } from 'firebase/auth';
import { useEffect } from 'react';

import { AutoRedirectPage } from '@/components/layout/AutoRedirectPage/AutoRedirectPage';
import { FillParent } from '@/components/layout/FillParent/FillParent';
import { Loading } from '@/components/layout/Loading/Loading';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/configs/firebase';
import { useAsyncAction } from '@/lib/hooks/useAsyncAction';

interface VerifiedEmailProps {
  oobCode: string;
}

export function VerifiedEmail({ oobCode }: VerifiedEmailProps) {
  const { start, isLoading } = useAsyncAction(applyActionCode, {});

  useEffect(() => {
    start([auth, oobCode]);
  }, []);

  return (
    <div className="center h-screen w-screen bg-primary text-center text-white">
      {isLoading ? (
        <FillParent>
          <Loading />
        </FillParent>
      ) : (
        <AutoRedirectPage redirectPath="/auth/signin">
          {(timeLeft, navigate) => (
            <div className="vh-flex-column max-w-[500px] gap-2 rounded-md bg-primary p-8 px-16">
              <p className="mb-8 text-9xl">📫</p>
              <h1 className="text-center text-4xl font-semibold">
                Email verified successfully!
              </h1>
              <p className="text-xl">
                Your email has been verified successfully. You can now sign in
                with your account.
              </p>
              <p className="text-center text-primary">
                You will be redirected to sign in page in {timeLeft / 1000}s. Or
                you can{' '}
                <Button
                  variant={'link'}
                  className="text-base text-primary"
                  onClick={navigate}
                >
                  click here
                </Button>{' '}
                to navigate now.
              </p>
            </div>
          )}
        </AutoRedirectPage>
      )}
    </div>
  );
}
