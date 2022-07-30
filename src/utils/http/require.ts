import { queryToString } from ".";
import { asyncMerge } from "../async";
import { useAsyncLocalStorageCache } from "../cache";

const baseUrl = `http://localhost:3000`;
let count = 0;
export const require = async function ({
  url,
  query,
  useClash: isClash,
  cacheDuration,
  useAsyncMerge,
}: {
  url: string;
  query?: { [key: string]: string | number };
  useClash?: boolean;
  cacheDuration?: number;
  useAsyncMerge?: boolean;
}) {
  const fullUrl = `${baseUrl}${url}${queryToString(query)}`;
  const f = async () => {
    // 是否启动缓存
    if (isClash) {
      return await useAsyncLocalStorageCache(
        fullUrl,
        async () => {
          const response = await fetch(fullUrl).catch((e) => {
            console.log(e);
            alert(e);
          });

          const data = await errorInterception(await response.json());
          return data;
        },
        cacheDuration
      );
    }
    return await (await fetch(fullUrl)).json();
  };

  //同一连接请求合并
  if (useAsyncMerge) {
    const data = await asyncMerge(fullUrl, f);
    return data;
  } else {
    return await f();
  }
} as any;
function errorInterception(data: any) {
  return new Promise<any>((resolve, reject) => {
    console.log("errorInterception");
    console.log(data);

    if (!data) {
      err("空数据");
      resolve(data);
    } else if (data.code === 200) {
      resolve(data);
    } else {
      const code = data.code as number;
      if (!code) {
        resolve(data);
      } else if (code === -460) {
        err(data.message);
        reject(data);
      } else {
        err(data.message);
        reject(data);
      }
    }
  });
}
function err(msg: string) {
  alert(msg);
}
