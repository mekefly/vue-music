import { inject, InjectionKey, provide, Ref, ref, watch } from "vue";
import { getSong } from "../api";
import { SongDetailType, Song } from "../api/song/SongDetailType";
import { defineGlobalSync } from "../utils";
import { useLocalStorage } from "../utils/vue";

// localStorage.clear();
type IdOfPlaying = null | number | string;
const playState = {
  idOfPlaying: useLocalStorage("idOfPlaying", null) as Ref<IdOfPlaying>,
  songName: ref("Song"),
  isPlay: useLocalStorage("isPlay", false),
  currentTime: ref(0),
  duration: ref(0),
  playList: useLocalStorage("playList+33343", [] as Array<Song>),
  playIndex: useLocalStorage("playIndex", 0 as number),
  playListHide: ref(true),
  coverUrl: ref("#"),
};

const { playList, playIndex, idOfPlaying, isPlay } = playState;

function usePlayState() {
  return playState;
}

export { usePlayState };

export default usePlayState;

/**
 * 全屏播放
 */
export const useFullScreen = defineGlobalSync(
  useLocalStorage("useFullScreen", false)
);

/**
 * 播放某一个
 *
 * @export
 * @param {(number | string)} id
 */
export function play(id: number | string) {
  isPlay.value = false;
  playState.idOfPlaying.value = id;

  setTimeout(() => {
    isPlay.value = true;
  }, 0);
}

/**
 * 下一首
 *
 * @export
 * @return {*}
 */
export function next() {
  const len = playList.value.length;

  playIndex.value++;
  if (playIndex.value >= len) {
    playIndex.value = 0;
  }
  const next = playList.value[playIndex.value];
  if (!next) {
    return;
  }
  idOfPlaying.value = next.id;
  isPlay.value = true;
}

watch(idOfPlaying, addCurrentToPlaylist);
/**
 * 添加当前播放到播放列表
 *
 * @param {*} nv
 * @param {*} ov
 * @return {*}
 */
async function addCurrentToPlaylist(nv: any, ov: any) {
  const { playIndex } = playState;
  const playList = playState.playList;
  //存在就不添加，唯一性
  const index = playList.value.map((item) => item.id).indexOf(nv as any);
  if (index !== -1) {
    playIndex.value = index;
    return;
  }
  const data = await getSong(nv);
  if (!data) return;
  playList.value.splice(playIndex.value, 0, data);
}
