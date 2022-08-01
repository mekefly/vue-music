<script lang="ts" setup>
import { computed, watch, ref, shallowRef, Ref } from "vue";
import MusicCardItem from "./MusicCardItem.vue";

import { getTopList } from "../api";
const props = withDefaults(
  defineProps<{
    limit?: number;
    itemLimit?: number;
  }>(),
  { limit: 3 }
);

const topList: Ref<any[]> = shallowRef([]);

getTopList().then((v) => {
  topList.value = v.list;
});
const limitTopList = computed(() => {
  const list = topList.value;
  if (!list) {
    return [];
  }
  if (!props.limit || list?.length <= props.limit) {
    return list;
  }

  return list.slice(0, props.limit);
});
</script>

<template>
  <MusicCardItem
    class="music-list-view"
    v-for="top in limitTopList"
    :topList="top"
    :key="top.id"
    :limit="itemLimit"
  ></MusicCardItem>
</template>

<style scoped>
.music-list-view {
  margin-bottom: 1rem;
}
</style>
