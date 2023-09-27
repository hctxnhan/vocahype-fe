import { useEffect } from 'react';

import { useBreadcrumb } from './useBreadcrumb';

function deepCompareArray(a: any[], b: any[]) {
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

export function useSetBreadcrumb(items: string[]) {
  const { setItems, items: currentItems } = useBreadcrumb();

  useEffect(() => {
    if (deepCompareArray(items, currentItems)) return;

    setItems(items);
  }, [setItems, items, currentItems]);
}
