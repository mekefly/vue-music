<script lang="ts" setup>
import { play } from "../views/PlayBar/playState";

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
  .left {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 4rem;
  }
  &.top-highlight:nth-child(1) .left,
  &.top-highlight:nth-child(2) .left,
  &.top-highlight:nth-child(3) .left {
    color: red;
    font-size: 2em;
  }
  .right {
    padding: 1rem 1rem;
    box-sizing: border-box;

    border-bottom: 1px solid #ddd;
    .name {
      .tns {
        color: #555;
      }
    }
    .author {
      color: #555;
    }
  }
}
</style>
