import { useEffect } from 'react';

import { useBreadcrumb } from './useBreadcrumb';

export function useSetBreadcrumb(items: string[]) {
  const { setItems } = useBreadcrumb();

  useEffect(() => {
    setItems(items);
  }, [setItems]);
}
