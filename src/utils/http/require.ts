import { queryToString } from ".";
import { asyncMerge } from "../async";
import { useAsyncLocalStorageCache } from "../cache";

const baseUrl = `http://localhost:3000`;
/**
 * 请求
 * @export
 * @param {({
 *   url: string;
 *   query?: { [key: string]: string | number };
 *   useClash?: boolean;
 *   cacheDuration?: number;
 *   useAsyncMerge?: boolean;
 * })} {
 *   url,
 *   query,
 *   useClash,
 *   cacheDuration,
 *   useAsyncMerge,
 * }
 * @return {*}
 */
export async function require({
  url,
  query,
  useCache,
  cacheDuration,
  useAsyncMerge,
}: {
  url: string;
  query?: { [key: string]: string | number };
  useCache?: boolean;
  cacheDuration?: number;
  useAsyncMerge?: boolean;
}) {
  const fullUrl = `${baseUrl}${url}${queryToString(query)}`;
  //同一连接请求合并
  if (useAsyncMerge) {
    return await asyncMerge(
      fullUrl,
      prepareCacheRequest,
      fullUrl,
      useCache,
      cacheDuration
    );
  } else {
    return await prepareCacheRequest(fullUrl, useCache, cacheDuration);
  }
}
/**
 * 准备缓存请求
 *
 * @param {string} fullUrl
 * @param {boolean} [useClash]
 * @param {number} [cacheDuration]
 * @return {*}
 */
function prepareCacheRequest(
  fullUrl: string,
  useClash?: boolean,
  cacheDuration?: number
) {
  // 是否启动缓存
  if (useClash) {
    return useAsyncLocalStorageCache(
      fullUrl,
      toRequest,
      cacheDuration,
      fullUrl
    );
  }
  return toRequest(fullUrl);
}
/**
 * 去请求
 *
 * @param {string} fullUrl
 * @return {*}
 */
function toRequest(fullUrl: string) {
  // return type Promise
  return fetch(fullUrl)
    .then(
      (response) => {
        //获取json错误
        return response.json();
      },
      (e) => {
        console.log(e);
        alert("网络错误");
        return Promise.reject(e);
      }
    )
    .then((data) => {
      /** 全局错误处理 */
      return errorInterception(data);
    });
}

/**
 * 错误拦截
 *
 * @param {*} data
 * @return {*}
 */
function errorInterception(data: any) {
  return new Promise<any>((resolve, reject) => {
    console.log("错误拦截器");

    const code = data?.code;
    if (!code || code === 200) {
      console.log("请求成功");
      resolve(data);
    } else {
      console.log("请求错误");
      reject(data);
      if (!data.message) {
        err("请求错误");
        return;
      }
      err(data.message);
    }
  });
}
function err(msg: string) {
  alert(msg);
}
