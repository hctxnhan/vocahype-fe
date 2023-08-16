export const getLocalStorageItem = <T>(key: string) => {
  const item = localStorage.getItem(key);
  return item ? (JSON.parse(item) as T) : null;
};

export const setLocalStorageItem = <T>(
  key: string,
  value: T | ((prevValue: T | null) => T)
) => {
  if (typeof value !== 'function') {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    const fn = value as (prevValue: T | null) => T;
    localStorage.setItem(key, JSON.stringify(fn(getLocalStorageItem<T>(key))));
  }
};

export const removeLocalStorageItem = (key: string) => {
  localStorage.removeItem(key);
};
