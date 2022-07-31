import { require } from "../utils";

export async function getSearch(query: {
  keywords: string;
  limit?: number;
  offset?: number;
}) {
  return await require({
    url: "/search",
    query,

    useCache: true,
    cacheDuration: 1000 * 60,
  });
}
export async function getCloudsearch(query: {
  keywords: string;
  limit?: number;
  offset?: number;
}) {
  return await require({
    url: "/cloudsearch",
    query,
    useCache: true,
    cacheDuration: 1000 * 60,
  });
}
