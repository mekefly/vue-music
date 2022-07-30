const asyncMergeData: {
  [key: string]: Array<{
    resolve: (cb: any) => void;
    reject: (cb: any) => void;
  }>;
} = {};

/**
 * 同一时间内执行相同任物的请求只保留一个，得到结果后返回结果，防止缓存未防护时全部击中
 * 此函数决定了同一连接的请求只触发一次
 *
 * @template E
 * @param {string} key
 * @param {() => Promise<E>} callBack
 * @return {*}  {Promise<E>}
 */
export function asyncMerge<E>(
  key: string,
  callBack: () => Promise<E>
): Promise<E> {
  return new Promise<E>((resolve, reject) => {
    const calls = asyncMergeData[key];
    //放到将来调用的列表里面去
    if (!calls) {
      //此函数是第一次调用
      asyncMergeData[key] = [{ resolve, reject }];
      callBack()
        .then((v) => {
          asyncMergeData[key].forEach((pv) => pv.resolve(v));
          asyncMergeData[key] = undefined as any;
        })
        .catch((e) => {
          asyncMergeData[key].forEach((pv) => pv.reject(e));
          asyncMergeData[key] = undefined as any;
        });
    } else {
      // 获取结果的将来列表
      calls.push({ resolve, reject });
    }
  });
}
