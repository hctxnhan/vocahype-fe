import { useEffect, useState } from 'react';

export function useCountdown(
  initialCountdown: number,
  onCountdownEnd?: () => void
) {
  const [countdown, setCountdown] = useState(initialCountdown);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prevCountdown => {
        if (prevCountdown === 0) {
          onCountdownEnd?.();
          return prevCountdown;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown, onCountdownEnd]);

  return countdown;
}
