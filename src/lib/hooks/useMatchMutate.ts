import { useSWRConfig } from 'swr';

export function useMatchMutate() {
  const { cache, mutate } = useSWRConfig();

  return (matcher: RegExp, ...args: unknown[]) => {
    if (!(cache instanceof Map)) {
      throw new Error(
        'matchMutate requires the cache provider to be a Map instance'
      );
    }

    const keys = [];

    for (const key of cache.keys()) {
      if (matcher.test(key as string)) {
        keys.push(key);
      }
    }

    const mutations = keys.map(key => mutate(key as string, args));
    return Promise.all(mutations);
  };
}
