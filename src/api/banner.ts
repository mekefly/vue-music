import { require } from "../utils";

export enum BannerType {
  PC = 0,
  ANDROID = 1,
  IPHONE = 2,
  IPAD = 3,
}
export async function getBanner(type: BannerType) {
  const data = require({
    url: "/banner",
    query: { type },
    useCache: true,
    useAsyncMerge: true,
  });
  return data;
}
