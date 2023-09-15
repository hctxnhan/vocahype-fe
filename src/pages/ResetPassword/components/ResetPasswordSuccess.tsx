import { useCallback } from 'react';
import { useLocation } from 'wouter';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCountdown } from '@/lib/hooks/useCountdown';

import { ResetPasswordLayout } from '../ResetPasswordLayout';

export function ResetPasswordSuccess() {
  const [, navigate] = useLocation();
  const onTimeout = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const countdown = useCountdown(3, onTimeout);

  return (
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
  );
}
