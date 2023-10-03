import { useSyncExternalStore } from 'react';

import { getSearchParamsCurrentUrl } from '../utils/utils';

function deepCompareObject(
  obj1: Partial<Record<string, string>>,
  obj2: Partial<Record<string, string>>
) {
  return (
    Object.keys(obj1).length === Object.keys(obj2).length &&
    Object.keys(obj1).every(key => obj1[key] === obj2[key])
  );
}

const events = ['popstate', 'pushState', 'replaceState', 'hashchange'];
function subscribe(callback: () => void) {
  for (const event of events) {
    window.addEventListener(event, callback);
  }
  return () => {
    for (const event of events) {
      window.removeEventListener(event, callback);
    }
  };
}

function getSearchParams<T extends Record<string, string>>(): () => Partial<T> {
  let cached: Partial<T> = {};

  return () => {
    const currentSearchParams = getSearchParamsCurrentUrl();
    if (deepCompareObject(currentSearchParams, cached)) {
      return cached;
    }
    cached = currentSearchParams;
    return cached;
  };
}

export const useSearchParams = <T extends Record<string, string>>() =>
  useSyncExternalStore(subscribe, getSearchParams<T>());
