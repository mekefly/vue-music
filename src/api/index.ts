import { require } from "../utils";
export * from "./login";
export * from "./song";
export * from "./search";

/**
 * 获取所有排行榜
 *
 * @export
 * @return {*}
 */
export async function getTopList() {
  return await require({
    url: "/toplist",
    useCache: true,
    cacheDuration: 1000 * 60 * 5,
  });
}
/**
 * https://neteasecloudmusicapi.vercel.app/#/?id=%e8%8e%b7%e5%8f%96%e6%ad%8c%e5%8d%95%e8%af%a6%e6%83%85
 * 获取歌单的详情
 *
 * @export
 * @param {type} params
 */
export async function getPlaylistDetail(query?: {
  //歌单id
  id?: number | string;
  //歌单最近的 s 个收藏者,默认为 8
  s?: string;
}) {
  const data = await require({
    url: "/playlist/detail",
    query,
    useCache: true,
    cacheDuration: 1000 * 60 * 5,
  });

  return data.playlist;
}
