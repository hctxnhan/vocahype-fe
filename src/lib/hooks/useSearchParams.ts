import { useEffect, useState } from 'react';
import { useRoute as useWouterRoute } from 'wouter';

export function useRoute<T>(pattern: string) {
  const [match, params] = useWouterRoute(pattern);
  const [newParams, setNewParams] = useState<T>(params as T);

  useEffect(() => {
    function handleUrlChange() {
      if (!match || !window.location.search) return;
      const urlSearchParams = new URLSearchParams(window.location.search);
      const queryParams = Object.fromEntries(urlSearchParams.entries());

      setNewParams({
        ...queryParams,
        ...params,
      } as T);
    }

    handleUrlChange();

    const events = ['popstate', 'pushState', 'replaceState'];

    events.map(e => addEventListener(e, handleUrlChange));

    return () => {
      events.map(e => removeEventListener(e, handleUrlChange));
    };
  }, [match]);

  return { match, params: newParams };
}
