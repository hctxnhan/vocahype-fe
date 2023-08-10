import { useRoute as useWouterRoute } from 'wouter';
import { useEffect, useState } from 'react';

export function useRoute(pattern: string) {
  const [match, params] = useWouterRoute(pattern);
  const [newParams, setNewParams] = useState(params);

  useEffect(() => {
    function handleUrlChange() {
      if (!match || !window.location.search) return;
      const urlSearchParams = new URLSearchParams(window.location.search);
      const queryParams = Object.fromEntries(urlSearchParams.entries());

      setNewParams({
        ...queryParams,
        ...params,
      });
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
