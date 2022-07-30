<script lang="ts" setup>
import { computed } from "vue";
import MusicListItem from "./MusicListItem.vue";
const props = defineProps<{
  tracks?: any[];
  limit?: number;
  topHighlight?: boolean;
}>();

const limitTracks = computed(() => {
  const value = props.tracks;

  if (!value) {
    return [];
  }
  if (props.limit === undefined || value.length < 20) {
    return value;
  }

  return value.slice(0, props.limit);
});
</script>

<template>
  <div class="list">
    <MusicListItem
      :topHighlight="topHighlight"
      v-for="(track, index) in limitTracks"
      :track="track"
      :index="index"
    ></MusicListItem>
  </div>
</template>

<style scoped lang="scss">
.list {
  overflow-y: auto;
}
</style>
