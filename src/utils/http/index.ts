export * from "./require";

export function queryToString(query?: { [k: string]: string | number }) {
  if (!query) {
    return "";
  }

  const keys = Object.keys(query);
  if (keys.length === 0) {
    return "";
  }
  let qs = "?";
  keys.forEach((key: string) => {
    qs += `${key}=${query[key]}`;
  });
  return qs;
}
