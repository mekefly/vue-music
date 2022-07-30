<script lang="ts" setup>
import { setBlockTracking, ref, Ref, computed } from "vue";
import { getPlaylistDetail } from "../api";
import { play } from "../views/PlayBar/playState";

const props = withDefaults(
  defineProps<{
    topList: any;
    limit?: number;
  }>(),
  { limit: 6 }
);

const playList: Ref<any> = ref({});

getPlaylistDetail({ id: props.topList.id }).then((v) => {
  playList.value = v;
});
const limitTracks = computed(() => {
  const value = playList.value?.tracks;
  if (!value) {
    return [];
  }
  if (value.length <= props.limit) {
    return value;
  }
  return value.slice(0, props.limit);
});
</script>

<template>
  <div class="collection-block">
    <div class="title">
      <h3>{{ topList.name }}</h3>
      <RouterLink
        :to="{
          path: `/more/${topList.name}/${topList.id}`,
        }"
        >更多</RouterLink
      >
    </div>
    <div class="content">
      <div
        class="item"
        v-for="track in limitTracks"
        @click="
          () => {
            play(track.id);
          }
        "
      >
        <div class="cover"><img :src="track.al.picUrl" alt="" /></div>
        <div class="name">{{ track.name }}</div>
        <div class="author">
          {{ track.ar.map((author) => author.name).join(",") }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.collection-block {
  background-color: white;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 0 1rem;
    height: 4rem;
    box-sizing: border-box;
    color: #333;
    a {
      text-decoration: none;
      color: #ddd;
    }
  }
  .content {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;

    .item {
      width: 30%;

      .cover {
        width: 100%;
        height: auto;
        img {
          width: 100%;
          height: auto;
        }
      }
      .name {
        margin: 1rem 0;
        font-weight: bold;
      }
      .author {
        color: #777;

        margin: 1rem 0;
      }
    }
  }
}
</style>
