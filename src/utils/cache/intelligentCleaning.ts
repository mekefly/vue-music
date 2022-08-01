import { checkLocalCache, isLocalCache } from ".";

intelligentCleaning();
export function intelligentCleaning() {
  const localStorage = window.localStorage;
  const len = localStorage.length;

  for (let i = 0; i < len; i++) {
    const key = localStorage.key(i);
    if (!key) {
      continue;
    }
    const cache: any = localStorage.getItem(key);
    if (!isLocalCache(cache)) {
      continue;
    }
    try {
      checkLocalCache(cache);
    } catch (err) {
      localStorage.removeItem(key);
    }
  }
}
