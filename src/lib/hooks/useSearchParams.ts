import { useEffect, useState } from 'react';
import { useRoute as useWouterRoute } from 'wouter';

/**
 * @deprecated
 * Deprecated: this hook is deprecated because this functioning incorrectly, we use `getSearchParams` or `getSearchParamsCurrentUrl` utilites instead.
**/
export function useRoute<T>(pattern: string) {
  const [match] = useWouterRoute(pattern);
  const [newParams, setNewParams] = useState<T>({} as T);
  
  useEffect(() => {
    function handleUrlChange() {
      if (!match || !window.location.search) return;
      const urlSearchParams = new URLSearchParams(window.location.search);
      const queryParams = Object.fromEntries(urlSearchParams.entries());

      setNewParams(queryParams as T);
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
