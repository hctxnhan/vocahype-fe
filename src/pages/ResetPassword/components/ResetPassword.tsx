import { useMultistep } from '@/lib/hooks/useMultiStep';

import { ResetPasswordSuccess } from './ResetPasswordSuccess';
import { SetPassword } from './SetPassword';

interface ResetPasswordProps {
  apiKey: string;
  oobCode: string;
}

export function ResetPassword({
  apiKey,
  oobCode,
}: ResetPasswordProps) {
  const { currentScreen } = useMultistep(
    [
      {
        screen: (
          <SetPassword
            apiKey={apiKey}
            oobCode={oobCode}
          />
        ),
      },
      {
        screen: <ResetPasswordSuccess />,
      }
    ],
  );

  return currentScreen;
}
