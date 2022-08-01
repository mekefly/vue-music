export * from "./intelligentCleaning";
/**内存缓存数据对象，更快一点 */
const cacheDate: any = {};

/** @type {*} 缓存失效或没有缓存将会抛出此错误 */
const noCache = Symbol();

/**
 * 异步缓存
 *
 * @export
 * @template E
 * @param {string} key 缓存的key名称
 * @param {() => Promise<E>} genValue 要处理的操作函数返回要缓存的Promise,如果Promise返回拒绝状态将不缓存
 * @param {number} [duration] 缓存持续时间
 * @return {*}  {Promise<E>}
 */
export async function useAsyncLocalStorageCache<E, REST extends any[]>(
  key: string,
  genValue: (...rest: REST) => Promise<E>,
  duration?: number,
  ...rest: REST
): Promise<E> {
  try {
    return getCache(key);
  } catch (error) {
    return await asyncReCache(key, genValue, duration, ...rest);
  }
}
/**
 * 同步缓存
 *
 * @export
 * @template E
 * @param {string} key
 * @param {() => E} genValue 要处理的操作函数返回要缓存的值
 * @param {number} [duration]
 * @return {*}  {E}
 */
export function useLocalStorageCache<E, REST extends any[]>(
  key: string,
  genValue: (...rect: REST) => E,
  duration?: number,
  ...rest: REST
): E {
  try {
    return getCache(key);
  } catch (error) {
    return reCache(key, genValue, duration, ...rest);
  }
}
/**
 * 异步从新缓存
 *
 * @param {string} key
 * @param {() => Promise<any>} genValue
 * @param {number} [duration]
 * @return {*}  {Promise<any>}
 */
function asyncReCache<E, REST extends any[]>(
  key: string,
  genValue: (...rest: REST) => Promise<E>,
  duration?: number,
  ...rest: REST
): Promise<any> {
  return genValue(...rest).then(
    (value: any) => {
      setCache(key, value, duration);
      return value;
    },
    (e) => e
  );
}
/**
 * 从新缓存
 *
 * @template E
 * @param {string} key
 * @param {() => E} genValue
 * @param {number} [duration]
 * @return {*}
 */
function reCache<E, REST extends any[]>(
  key: string,
  genValue: (...rest: REST) => E,
  duration?: number,
  ...rest: REST
) {
  const value = genValue(...rest);

  return value;
}
/**
 * 获取缓存
 *
 * @param {string} key
 * @return {*}
 */
function getCache(key: string) {
  try {
    return getMemoryCache(key);
  } catch (error) {
    return getLocalStorageCache(key);
  }
}
/**
 * 设置缓存
 *
 * @param {string} key
 * @param {*} value
 * @param {number} [duration]
 */
function setCache(key: string, value: any, duration?: number) {
  const localStorageCache = createLocalCache(value, duration);
  setMemoryCache(key, localStorageCache);
  setLocalStorage(key, localStorageCache);
}
/**
 * 缓存内存缓存，更快
 *
 * @param {string} key
 * @return {*}
 */
function getMemoryCache(key: string) {
  const cache = cacheDate[key];

  checkLocalCache(cache);

  return cache;
}
/**
 * 获取LocationStorage缓存
 *
 * @param {string} key
 * @return {*}
 */
function getLocalStorageCache(key: string) {
  const catchString = getLocalStorageString(key);
  const cache: LocalCache<any> = JSON.parse(catchString);

  checkLocalCache(cache);

  return cache.value;
}
/**
 * LocalStorage只可以存储文本
 *
 * @param {string} key
 * @return {*}
 */
function getLocalStorageString(key: string) {
  const valueString = localStorage.getItem(key);

  if (!valueString) {
    throw noCache;
  }
  return valueString;
}
/**
 * 设置内存缓存
 *
 * @param {string} key
 * @param {*} value
 */
function setMemoryCache(key: string, value: any) {
  cacheDate[key] = value;
}
/**
 * 设置LocalStorage缓存
 *
 * @param {string} key
 * @param {*} value
 */
function setLocalStorage(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}
/**
 * 验证本地缓存
 *
 * @template E
 * @param {LocalCache<E>} localCache
 * @return {*}
 */
export function checkLocalCache<E>(localCache: LocalCache<E>) {
  if (!localCache) {
    throw noCache;
  }

  const nowTime = Date.now();
  const updateTime = localCache.updateTime;
  const duration = localCache.duration;

  try {
    if (!(nowTime - updateTime < duration)) {
      throw noCache;
    }
  } catch (error) {
    throw noCache;
  }
}
/**
 * 创建本地缓存
 *
 * @template T
 * @param {T} value
 * @param {number} [duration=3600000]
 * @return {*}  {LocalCache<T>}
 */
function createLocalCache<T>(
  value: T,
  duration: number = 3600000 /**= 1000 * 60 * 60 1h */
): LocalCache<T> {
  return {
    value,
    updateTime: Date.now(),
    duration,
  };
}
export function isLocalCache(v: any): v is LocalCache<any> {
  if (typeof v !== "object") {
    return false;
  }
  if (typeof v.updateTime !== "number") {
    return false;
  }
  if (typeof v.duration !== "number") {
    return false;
  }
  return true;
}

/**
 * 本地缓存接口
 *
 * @interface LocalCache
 * @template E
 */
interface LocalCache<E> {
  value: E;
  //unit ms
  updateTime: number;
  //unit ms
  duration: number;
}
