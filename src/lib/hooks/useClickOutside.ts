import { RefObject, useCallback, useEffect, useState } from 'react';

export function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  callback?: (isBlur: boolean) => void
) {
  const [isOutside, setIsOutside] = useState(false);
  const handleClick: EventListener = useCallback(
    e => {
      callback &&
        callback(!!(ref.current && !ref.current.contains(e.target as Node)));
      setIsOutside(!(ref.current && !ref.current.contains(e.target as Node)));
    },
    [ref]
  );

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [handleClick]);

  return isOutside;
}
