import { require } from "../utils";

export async function getSearch(query: {
  keywords: string;
  limit?: number;
  offset?: number;
}) {
  return await require({
    url: "/search",
    query,

    useClash: true,
    duration: 1000 * 60,
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
    useClash: true,
    duration: 1000 * 60,
  });
}
