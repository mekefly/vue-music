const cacheDate: any = {};

export async function useAsyncLocalStorageCache<E>(
  key: string,
  genValue: () => Promise<E>,
  duration?: number
): Promise<E> {
  const value = cacheDate[key];
  if (checkTime(value)) return value;

  const valueString = localStorage.getItem(key);

  if (!valueString) {
    return await asyncReCache(key, genValue, duration);
  }

  try {
    const v: LocalStorageCache<E> = JSON.parse(valueString);
    if (checkTime(v)) return v.value;
    return await asyncReCache(key, genValue, duration);
  } catch (e) {
    return await asyncReCache(key, genValue, duration);
  }
}

function asyncReCache(
  key: string,
  genValue: any,
  duration?: number
): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    genValue()
      .then((value: any) => {
        const localStorageCache = createLocalStorageCache(value, duration);
        cacheDate[key] = localStorageCache;
        localStorage.setItem(key, JSON.stringify(localStorageCache));
        resolve(value);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}
export function useLocalStorageCache<E>(key: string, genValue: () => E): E {
  const value = cacheDate[key];
  if (checkTime(value)) return value;

  const valueString = localStorage.getItem(key);
  if (!valueString) {
    return reCache(key, genValue);
  }
  try {
    const v = JSON.parse(valueString);
    if (checkTime(v)) return v.value;
    return reCache(key, genValue);
  } catch (e) {
    return reCache(key, genValue);
  }
}
function reCache(key: string, genValue: any, duration?: number) {
  const value = genValue();

  const localStorageCache = createLocalStorageCache(value, duration);
  cacheDate[key] = localStorageCache;
  localStorage.setItem(key, JSON.stringify(localStorageCache));
  return value;
}
function checkTime<E>(localStorageCache: LocalStorageCache<E>) {
  if (!localStorageCache) return false;

  const nowTime = Date.now();
  const updateTime = localStorageCache.updateTime;
  const duration = localStorageCache.duration;
  try {
    return nowTime - updateTime < duration;
  } catch (error) {
    return false;
  }
}
function createLocalStorageCache<T>(
  value: T,
  duration: number = 3600000 /**= 1000 * 60 * 60 1h */
): LocalStorageCache<T> {
  return {
    value,
    updateTime: Date.now(),
    duration,
  };
}

interface LocalStorageCache<E> {
  value: E;
  //unit ms
  updateTime: number;
  //unit ms
  duration: number;
}
