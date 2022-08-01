<script lang="ts" setup>
import PlayButton from "./PlayButton.vue";
import { usePlayState, useFullScreen } from "../state/playState";
import LoadingBlock from "./LoadingBlock.vue";

const { currentTime, duration, isPlay, songName, coverUrl, playListHide } =
  usePlayState();
const fullScreen = useFullScreen();
</script>

<template>
  <div class="background" :class="{ 'transparent-background': fullScreen }">
    <div class="play-bar" :class="{ 'transparent-background': fullScreen }">
      <i
        @click="
          () => {
            fullScreen = !fullScreen;
          }
        "
        class="fa-solid fa-angle-up btn full-screen block"
      ></i>

      <PlayButton
        class="play-btn btn block full-screen-hide"
        v-model:value="isPlay"
      ></PlayButton>
      <div
        class="cover block btn full-screen-hide"
        :style="{ backgroundImage: `url(${coverUrl})` }"
      >
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
  </div>
</template>

<style scoped lang="scss">
.background {
  position: fixed;
  bottom: 0px;

  display: flex;
  justify-content: center;

  width: 100%;

  background-color: white;

  transition: 0.5s;
  transition-property: background-color;

  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  &.transparent-background {
    box-shadow: none;
    background-color: transparent;
    color: white;
    .play-bar {
      max-width: 100vw;
      .full-screen-hide {
        transform: translateY(100%) scale(1, 0);
        width: 0px;
        margin: 0px;

        transition: transform var(--duration3),
          width var(--duration3) var(--duration2), margin var(--duration3);
      }
      .full-screen.btn {
        transform: rotate(180deg);

        color: white;
      }
    }
    .play-btn {
      --color: white;
    }
    input {
      background-color: transparent;
    }
  }
  .play-bar {
    --s: 3rem;
    display: flex;
    justify-items: center;
    align-items: center;

    height: var(--s);
    width: 100%;

    max-width: var(--max-width);

    padding: 0 1rem;
    box-sizing: border-box;
    transition: max-width 0.5s;
    .full-screen-hide {
      transition: transform var(--duration3) var(--duration2),
        width var(--duration3), margin var(--duration3);
    }
    .btn {
      --size: calc(var(--s) * 0.6);
      display: block;

      flex-shrink: 0;
      margin: 0 calc(var(--size) / 4);
      font-size: var(--size);
      height: var(--size);
      width: var(--size);
    }
    .btn.play {
      --size: calc(var(--s) * 0.6);
    }
    .btn.full-screen {
      font-size: 2rem;
      transition: transform 0.5s;
      transition-property: transform, color;
    }
    .cover {
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
        font-size: var(--size);
      }
      input {
        display: block;
        height: var(--size);
        width: 100%;
      }
    }
  }
}
</style>