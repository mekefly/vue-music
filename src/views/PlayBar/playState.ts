import { inject, InjectionKey, provide, Ref, ref, watch } from "vue";
import { defineGlobalSync } from "../../utils";
import { useLocalStorage } from "../../utils/vue";

type IdOfPlaying = null | number | string;
const playState = {
  idOfPlaying: useLocalStorage("idOfPlaying") as Ref<IdOfPlaying>,
  songName: ref("音乐"),
  isPlay: useLocalStorage("isPlay", false),
  currentTime: ref(0),
  duration: ref(0),
  playList: useLocalStorage("playList", [] as IdOfPlaying[]),
  coverUrl: ref("#"),
};
watch(playState.idOfPlaying, (nv, ov) => {
  const playList = playState.playList;
  //存在就不添加，唯一性
  const include = playList.value.includes(nv);
  if (include) {
    return;
  }

  //找到当前播放的位置然后把新的音乐添加到后面
  const index = playList.value.indexOf(ov);
  if (index === -1) {
    //找不到就默认添加到最后
    playList.value.push(ov);
  }
  playList.value.splice(index, 0, nv);
});
function usePlayState() {
  return playState;
}
export { usePlayState };
export default usePlayState;

export const useFullScreen = defineGlobalSync(
  useLocalStorage("useFullScreen", false)
);

export function play(id: number | string) {
  playState.idOfPlaying.value = id;
}
