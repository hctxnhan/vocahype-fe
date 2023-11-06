import { Globe2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function ApplicationError({
  ErrorIcon = Globe2,
  canRefresh = false,
  errorTitle = 'Internal Server Error',
  errorDescription = "Kind of embarrassing, but we're having some server issues.",
}: {
  canRefresh?: boolean;
  errorTitle?: string;
  errorDescription?: string;
  ErrorIcon?: any;
}) {
  function reloadPage() {
    window.location.reload();
  }

  function goToHome() {
    window.location.href = '/';
  }

  return (
    <div className="center h-full flex-col gap-4">
      <ErrorIcon width={150} height={150} className="text-secondary" />
      <h1 className="font-display text-4xl font-semibold text-primary">
        {errorTitle}
      </h1>
      <div className="text-lg">
        <p>{errorDescription}</p>
        <p>Try again later, or contact us if the problem persists.</p>
      </div>
      <div className="center flex-col gap-2">
        {canRefresh && (
          <Button
            onClick={reloadPage}
            className="text-base"
            variant={'outline'}
          >
            Reload
          </Button>
        )}
        <Button onClick={goToHome} variant={'link'} className="text-sm">
          Return Home
        </Button>
      </div>
    </div>
  );
}
