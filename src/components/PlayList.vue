<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { getSongDetail } from "../api";
import usePlayState from "../state/playState";
import { play } from "../state/playState";

import { onClickOutside } from "@vueuse/core";
import Vip from "./Vip.vue";
const { playList, playIndex, playListHide, idOfPlaying } = usePlayState();

const playListDom = ref(null);
onClickOutside(playListDom, () => {
  playListHide.value = true;
});
function deleteCurrent() {
  playList.value.splice(playIndex.value, 1);
  const len = playList.value.length;
  if (playIndex.value >= len) {
    playIndex.value--;
  }
  if (playIndex.value < 0) {
    playIndex.value = 0;
    return;
  }
  const next = playList.value[playIndex.value];
  if (!next) {
    return;
  }
  idOfPlaying.value = next.id;
}
</script>

<template>
  <div class="cover" :class="{ hide: playListHide }"></div>

  <div
    :ref="(el:any)=>playListDom = el as any"
    class="play-list"
    :class="{ hide: playListHide }"
  >
    <div class="header">
      <div>播放列表({{ playList.length }})</div>
      <div class="right">
        <i class="fa-solid fa-trash delete" @click="deleteCurrent"></i>
        <i
          class="fa-solid fa-angle-down close"
          @click="
            () => {
              playListHide = true;
            }
          "
        ></i>
      </div>
    </div>
    <div class="content">
      <div class="item" v-if="playList.length === 0">您没有添加任何歌曲</div>
      <div
        class="item"
        :class="{ active: playIndex === index }"
        v-for="(playItem, index) in playList"
        @click="
          () => {
            play(playItem.id);
          }
        "
      >
        {{ playItem.name }} -
        <span class="author">
          {{ playItem.ar.map((item) => item.name).join(",") }}
        </span>
        <Vip v-if="playItem.fee === 1"></Vip>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cover {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: #000000aa;

  transition: 0.3s;
  transition-property: transform, opacity, border-radius;
  &.hide {
    transform: translateY(100%);
    opacity: 0;
    border-radius: 50% 50% 0 0;
  }
}
.play-list {
  position: fixed;
  // left: 0;
  bottom: 0px;

  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: var(--max-width);
  min-height: 61.8%;

  max-height: 100vh;
  background-color: white;
  overflow: hidden;
  border-radius: 1rem 1rem 0 0;

  transition: 0.5s;
  transition-property: transform;
  &.hide {
    transform: translateY(100%);
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;

    height: 3rem;
    padding: 0 1rem;
    box-sizing: border-box;
    flex-shrink: 0;

    background-color: #ddd;
    .right {
      i {
        margin-left: 1rem;
        font-size: 1.4rem;
      }

      .delete {
        &:active {
          color: red;
        }
      }
    }
  }

  .content {
    flex-grow: 1;
    overflow-y: auto;

    .item {
      padding: 0.5rem 0.5rem;
      border-bottom: 1px solid #ddd;

      transition: 0.5s;
      transition-property: background-color;
      &.active {
        background-color: #dfe4ea;
      }
      .author {
        color: #666;
      }
    }
  }
}
</style>
