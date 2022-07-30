<script lang="ts" setup>
import { Ref, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { getPlaylistDetail } from "../api";
import { router } from "../router/index";
import MusicList from "../components/MusicList.vue";
const playList: Ref<any> = ref({});

const route = useRoute();
getPlaylistDetail({ id: route.params.id }).then((v) => {
  playList.value = v;
});
</script>

<template>
  <MusicList :topHighlight="true" :tracks="playList?.tracks ?? []"></MusicList>
</template>

<style scoped lang="scss"></style>
