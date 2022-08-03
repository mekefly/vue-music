<script lang="ts" setup>
import { Ref, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { getPlaylistDetail } from "../api";
import { router } from "../router/index";
import MusicList from "../components/MusicList.vue";
const route = useRoute();
const playList: Ref<any> = ref(
  await getPlaylistDetail({ id: route.params.id as string })
);
</script>

<template>
  <MusicList :topHighlight="true" :tracks="playList?.tracks ?? []"></MusicList>
</template>

<style scoped lang="scss"></style>
