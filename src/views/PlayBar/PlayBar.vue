<script lang="ts" setup>
import { Ref, ref, inject, InjectionKey, provide } from "vue";
import PlayButton from "../../components/PlayButton.vue";
import usePlayState, { useIdOfPlaying, useIsPlay } from "./playState";
import { useFullScreen } from "./playState";
import Player from "./Player.vue";
import MusicList from "../../components/MusicList.vue";
import PlayList from "./PlayList.vue";
import LoadingBlock from "../../components/LoadingBlock.vue";

const {
  currentTime,
  duration,
  isPlay,
  idOfPlaying,
  songName,
  coverUrl,
  playListHide,
} = usePlayState();
const fullScreen = useFullScreen();
</script>

<template>
  <div class="app" :class="{ 'full-screen': fullScreen }">
    <RouterView v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </RouterView>
  </div>
  <Player></Player>
  <div class="play-bar" :class="{ 'transparent-background': fullScreen }">
    <i
      @click="
        () => {
          fullScreen = !fullScreen;
        }
      "
      class="fa-solid fa-angle-up btn full-screen block"
    ></i>

    <PlayButton class="play-btn btn block" v-model:value="isPlay"></PlayButton>
    <div class="cover block" :style="{ backgroundImage: `url(${coverUrl})` }">
      <LoadingBlock v-if="!coverUrl || coverUrl === ''"></LoadingBlock>
    </div>
    <div class="content">
      <p>{{ songName }}</p>
      <input
        type="range"
        name=""
        id=""
        :max="duration"
        :value="currentTime"
        @input="(e:any) => {
        currentTime = e.target.value
      }"
      />
    </div>
    <i
      class="fa-brands fa-playstation btn"
      @click="
        () => {
          playListHide = !playListHide;
        }
      "
    ></i>
  </div>
  <PlayList></PlayList>
</template>

<style scoped lang="scss">
.app {
  display: flex;
  flex-direction: column;

  height: 100vh;
  width: 100vw;
  &.full-screen {
    overflow: hidden;
  }
}
.play-bar {
  position: fixed;
  bottom: 0px;

  display: flex;
  justify-items: center;
  align-items: center;

  height: 4rem;
  width: 100%;
  padding: 0 1rem;
  box-sizing: border-box;

  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  transition: 0.5s;
  transition-property: background-color;

  .btn {
    flex-shrink: 0;
    margin: 0 1rem;
  }
  .btn.full-screen {
    font-size: 2rem;
    transition: transform 0.5s;
    transition-property: transform, color;
  }
  .cover {
    height: 3rem;
    width: 3rem;
    border-radius: 50%;
    background-color: #ddd;
    margin-right: 0.5rem;
    background-position: center;
    background-size: cover;

    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }

  .content {
    flex-grow: 1;
    p {
      margin: 0;
    }
    input {
      width: 100%;
    }
  }
  &.transparent-background {
    box-shadow: none;
    background-color: transparent;
    color: white;
    .play-btn {
      --color: white;
    }
    input {
      background-color: transparent;
    }
    .full-screen.btn {
      transform: rotate(180deg);

      color: white;
    }
  }
}
</style>
