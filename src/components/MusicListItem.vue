<script lang="ts" setup>
import { play } from "../state/playState";
import Vip from "./Vip.vue";

defineProps<{
  track: any;
  index?: number;
  topHighlight?: boolean;
}>();
</script>

<template>
  <div
    class="item"
    :class="{ 'top-highlight': topHighlight }"
    @click="
      () => {
        play(track.id);
      }
    "
  >
    <div class="left" v-if="typeof index === 'number'">
      {{ (index + 1).toString().padStart(2, "0") }}
    </div>
    <div class="right">
      <h4 class="name">
        <Vip v-if="track.fee === 1"></Vip>
        {{ track.name }}
        <span class="tns" v-if="!!track.tns">
          ({{ track.tns.join(",") }})
        </span>
      </h4>
      <p class="author" v-if="!!track.ar">
        {{ track.ar.map((author) => author.name).join(",") }}
        <span class="name" v-if="!!track.name"> - {{ track.name }}</span>
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.item {
  display: flex;
  width: 100%;

  border-bottom: 1px solid #ddd;

  &:active {
    background-color: #ddd;
  }
  .left {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 64px;
  }
  &.top-highlight:nth-child(1) .left,
  &.top-highlight:nth-child(2) .left,
  &.top-highlight:nth-child(3) .left {
    color: red;
    font-size: 2em;
  }
  .right {
    padding: 1em 1em;
    box-sizing: border-box;

    > .name {
      display: flex;
      align-items: center;
      .tns {
        color: #555;
      }
    }
    .author {
      display: flex;
      color: #555;
    }
  }
}
</style>
