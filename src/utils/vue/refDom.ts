import { Ref, ref } from "vue";
export function divRef(): Ref<HTMLDivElement> {
  return ref(null) as any;
}
export function inputRef(): Ref<HTMLInputElement> {
  return ref(null) as any;
}
export function buttonRef(): Ref<HTMLButtonElement> {
  return ref(null) as any;
}
export function audioRef(): Ref<HTMLAudioElement> {
  return ref(null) as any;
}
