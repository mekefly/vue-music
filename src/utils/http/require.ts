import { queryToString } from ".";
import { useAsyncLocalStorageCache } from "../cache";

const baseUrl = `http://localhost:3000`;
export const require = async function ({
  url,
  query,
  useClash: isClash,
  cacheDuration,
}: {
  url: string;
  query?: { [key: string]: string | number };
  useClash?: boolean;
  cacheDuration?: number;
}) {
  if (isClash) {
    return useAsyncLocalStorageCache(
      url,
      async () => {
        return await (
          await fetch(`${baseUrl}${url}${queryToString(query)}`)
        ).json();
      },
      cacheDuration
    );
  }
  return await (await fetch(`${baseUrl}${url}${queryToString(query)}`)).json();
} as any;
