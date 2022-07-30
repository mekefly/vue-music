<script lang="ts" setup>
import {
  computed,
  ref,
  shallowRef,
  Ref,
  watch,
  watchEffect,
  onUnmounted,
} from "vue";
import { useRoute } from "vue-router";
import { getSongDetail, getSongUrlById } from "../../api";
import PlayButton from "../../components/PlayButton.vue";
import Lyric from "../../components/Lyric.vue";
import usePlayState, { useFullScreen } from "./playState";

const {
  currentTime,
  duration,
  //歌曲的id
  idOfPlaying,

  //播放状态
  isPlay,
  songName,
  coverUrl,
} = usePlayState();

const fullScreen = useFullScreen();

//歌曲详情data
const songDetailData: Ref<any> = shallowRef({});

//urldata
const songUrlData: Ref<any> = shallowRef(null);
watchEffect(() => {
  if (!idOfPlaying.value) {
    return;
  }
  //获取歌曲详情
  getSongDetail(idOfPlaying.value).then((v) => {
    const song = v?.songs?.[0];
    if (!song) {
      return;
    }
    songDetailData.value = song;

    songName.value = song.name;
    coverUrl.value = song?.al?.picUrl;
  });
});

watchEffect(() => {
  if (!idOfPlaying.value) {
    return;
  }
  //获取url数据
  getSongUrlById({ id: idOfPlaying.value as string }).then((v) => {
    songUrlData.value = v;
    isPlay.value = true;
  });
});

//音乐url
const url = computed(() => {
  return songUrlData.value?.data?.[0]?.url ?? "";
});

//audio标签
const audioDom: Ref<HTMLAudioElement | null> = ref(null);
const played = ref(false);

//播放状态更新
watch(isPlay, updateAudio);
watch(isPlay, () => {
  if (!isPlay.value) {
    played.value = false;
  }
});

function updateAudio() {
  const audioValue = audioDom.value;

  if (!audioValue) {
    //audioValue不存在代表还没获取到对应的标签
    return;
  }
  if (url.value === "") {
    //url还没赋代表某些错误，比如没权限
    return;
  }

  if (isPlay.value) {
    if (audioValue.paused) {
      //尝试播放
      audioValue
        .play()
        .then(() => {
          //播放成功就把状态变为已播放
          played.value = true;
          console.log("播放成功");
        })
        .catch(function (error) {
          console.log(error);

          console.log("播放失败");
          played.value = false;

          audioValue.pause();
          //播放失败两秒后继续尝试
          setTimeout(updateAudio, 2000);
        });
    }
  } else {
    if (!audioValue.paused) {
      audioValue.pause();
      played.value = false;
    }
  }
}

let isStopUpdate = false;

//播放进度更新
function timeupdateHandle(e: any) {
  isStopUpdate = true;
  currentTime.value = e.target.currentTime;
  isStopUpdate = false;
}
watch(currentTime, () => {
  if (!audioDom.value) {
    return;
  }

  if (Math.abs(audioDom.value.currentTime - currentTime.value) < 0.1) {
    return;
  }

  audioDom.value.currentTime = currentTime.value;
});
function canplayHandle(this: HTMLAudioElement) {}
function durationchangeHandel() {
  duration.value = audioDom.value?.duration ?? 0;
}
</script>

<template>
  <div
    class="player"
    :class="{ 'full-screen': fullScreen, ['is-play']: played }"
  >
    <div class="bg-container">
      <div
        class="background"
        :style="{ backgroundImage: `url(${songDetailData?.al?.picUrl ?? ''})` }"
      ></div>
    </div>
    <div class="header">
      <i
        class="fa-solid fa-angle-left"
        @click="
          () => {
            // $router.back();
            fullScreen = false;
          }
        "
      ></i>
      <span>{{ songDetailData?.name ?? "音乐" }}</span>
      <span></span>
    </div>

    <div class="img">
      <div>
        <div
          @click="
            () => {
              isPlay = !isPlay;
            }
          "
          class="cover"
        >
          <img :src="songDetailData?.al?.picUrl ?? ''" alt="" />
        </div>
      </div>

      <PlayButton class="btn" v-model:value="isPlay"></PlayButton>
    </div>

    <audio
      :src="url"
      :ref="(el) => (audioDom = el as any)"
      autoplay
      @durationchange="durationchangeHandel"
      @timeupdate="timeupdateHandle"
      @canplay="canplayHandle"
      @ended="
        () => {
          isPlay = false;
        }
      "
    ></audio>
    <Lyric class="lyric" :time="currentTime" :id="idOfPlaying"></Lyric>
  </div>
</template>

<style scoped lang="scss">
.player {
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  align-content: center;
  flex-direction: column;

  height: 100vh;
  width: 100%;

  color: white;
  overflow: hidden;
  transform: translateY(100%);
  transition: transform 0.5s;
  background-color: #292e49;
  &.full-screen {
    transform: translateY(0%);
  }
  .bg-container {
    position: absolute;

    height: 100%;
    width: 100%;
    overflow: hidden;
    z-index: -1;
    .background {
      position: absolute;

      height: 100%;
      width: 100%;

      background: linear-gradient(135deg, #536976, #292e49);
      background-position: center;
      background-size: cover;
      transform: scale(1.2);

      filter: blur(30px);
      overflow: hidden;
      &::after {
        content: "";
        display: block;

        height: 100%;
        width: 100%;

        background-color: #000000aa;
        transform: scale(1.2);
      }
    }
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-content: center;

    height: 4rem;
    padding: 1rem;

    box-sizing: border-box;
    font-size: 1.5rem;
    font-weight: bold;
  }
  .img {
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2.5rem 0;

    > div {
      border-radius: 50%;
      box-shadow: rgba(255, 255, 255, 0.12) 0px 2px 4px 0px,
        rgba(255, 255, 255, 0.32) 0px 2px 16px 0px;
    }
    .cover {
      height: 20rem;
      width: 20rem;

      overflow: hidden;
      border-radius: 50%;

      border: 3rem solid #292e49;
      box-sizing: border-box;

      img {
        height: 100%;
        width: 100%;

        object-fit: cover;
        object-position: center;
      }
    }
    .btn {
      position: absolute;
      --color: #fff;
      --size: 4.2rem;
    }
  }
  .lyric {
    flex-grow: 1;
    flex-shrink: 1;
    margin: 3rem 0;
  }
}
.player.is-play .cover {
  animation: router 2s infinite linear;
}

@keyframes router {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
