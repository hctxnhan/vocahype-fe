import { useLocation } from 'wouter';

import { useCountdown } from '@/lib/hooks/useCountdown';

interface AutoRedirectPageProps {
  redirectPath: string;
  timeout?: number;
  children: (timeLeft: number, navigateNow: () => void) => JSX.Element;
}

export function AutoRedirectPage({
  redirectPath,
  timeout = 3000,
  children,
}: AutoRedirectPageProps) {
  const [, navigate] = useLocation();
  const navigateNow = () => navigate(redirectPath);
  const countdown = useCountdown(timeout / 1000, navigateNow);

  return <>{children(countdown, navigateNow)}</>;
}
