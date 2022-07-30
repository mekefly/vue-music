import { require } from "../../utils";
import { Lyric } from "./lyricType";
import { SongDetailType } from "./SongDetailType";

/**
 * 获取音乐 url
 *
 * @export
 * @param {({
 *   音乐id
 *   id: number | string;
 *   码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推
 *   br?: number | string;
 * })} query
 * @return {*}
 */
export async function getSongUrlById(query: {
  id: number | string;
  br?: number | string;
}) {
  return await require({
    url: "/song/url",
    query,
    useCache: true,
    useAsyncMerge: true,
  });
}
export async function getSong(id: number | string | undefined | null) {
  if (!id) return;
  return (await getSongDetail(id))?.songs?.[0];
}

/**
 * https://neteasecloudmusicapi.vercel.app/#/?id=%e8%8e%b7%e5%8f%96%e6%ad%8c%e6%9b%b2%e8%af%a6%e6%83%85
 * 获取歌曲详情
 *
 * @export
 * @param {(Array<string | number> | string)} ids
 * @return {*}
 */
export async function getSongDetail(
  ids: Array<string | number> | string | number
): Promise<SongDetailType> {
  const data = await require({
    url: "/song/detail",
    query: {
      ids:
        typeof ids === "string" || typeof ids === "number"
          ? ids
          : ids.join(","),
    },
    useCache: true,
    useAsyncMerge: true,
  });

  return data;
}

export async function getLyricById(query: {
  id: number | string;
}): Promise<Lyric> {
  const data = await require({
    url: "/lyric",
    query,
    useCache: true,
    useAsyncMerge: true,
  });

  return data;
}
