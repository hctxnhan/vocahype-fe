import * as R from 'ramda';
import { useEffect } from 'react';

import { BreadcrumbItem } from '../context/breadcrumb.context';

import { useBreadcrumb } from './useBreadcrumb';

function deepCompareArrayOfObject(
  a: (object | string)[],
  b: (object | string)[]
) {
  if (a.length === 0 && b.length === 0) return true;

  if (a.length !== b.length) return false;

  const compare = (a: object | string, b: object | string) => {
    if (typeof a === 'object' && typeof b === 'object') {
      return R.equals(a, b);
    }

    return a === b;
  };

  return a.every((item, index) => compare(item, b[index]));
}

export function useSetBreadcrumb(items: BreadcrumbItem[]) {
  const { setItems, items: currentItems } = useBreadcrumb();

  useEffect(() => {
    if (deepCompareArrayOfObject(items, currentItems)) return;
    setItems(items);
  }, [items]);
}
