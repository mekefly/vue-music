import { Ref, ref, UnwrapRef, watch } from "vue";

export function defineGlobalSync<E>(value: E): () => Ref<UnwrapRef<E>> {
  const refValue = ref(value);
  return function () {
    return refValue;
  };
}
export function useLocalStorage<E>(key: string, defaul?: E): Ref<E> {
  let v: any;
  try {
    const localString = localStorage.getItem(key);
    if (localString) {
      v = JSON.parse(localString);
    }
  } catch (error) {
    v = defaul;
  }
  if (v === null || v === undefined) {
    v = defaul;
  }
  const r = ref(v);

  watch(r, () => {
    localStorage.setItem(key, JSON.stringify(r.value));
  });
  return r;
}