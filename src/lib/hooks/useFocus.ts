import { RefObject, useEffect, useState, useCallback } from 'react';

export function useFocus(ref: RefObject<HTMLElement | null>) {
  const [isFocus, setIsFocus] = useState(false);

  const onFocus: EventListener = useCallback(
    e => e.target === ref.current && setIsFocus(true),
    [ref]
  );
  const onBlur: EventListener = useCallback(
    e => e.target === ref.current && setIsFocus(false),
    [ref]
  );

  useEffect(() => {
    ref.current?.addEventListener('focus', onFocus);
    ref.current?.addEventListener('blur', onBlur);
  }, [ref, onBlur, onFocus]);

  return isFocus;
}
