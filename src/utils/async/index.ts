export * from "./merge";

export function timeout(duration: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, duration);
  });
}
