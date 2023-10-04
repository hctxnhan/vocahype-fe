import { AutoRedirectPage } from '@/components/layout/AutoRedirectPage/AutoRedirectPage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { ResetPasswordLayout } from '../ResetPasswordLayout';

export function ResetPasswordSuccess() {
  return (
    <AutoRedirectPage redirectPath="/auth/signin">
      {countdown => (
        <ResetPasswordLayout showLoginText={false}>
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Reset password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="font-semibold">
                Your password has been reset successfully. We’ll redirect you to
                homepage shortly.
              </p>
              <p className="text-sm">Redirect to homepage in {countdown}s.</p>
            </CardContent>
          </Card>
        </ResetPasswordLayout>
      )}
    </AutoRedirectPage>
  );
}
