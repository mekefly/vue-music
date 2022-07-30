<script lang="ts" setup>
import { ref, Ref, computed } from "vue";
import { useRoute } from "vue-router";
import MusicList from "../components/MusicList.vue";
import { getSearch, getCloudsearch } from "../api/index";
import LoadingBlock from "../components/LoadingBlock.vue";

const playList: Ref<any> = ref({});

const route = useRoute();
const value = ref("");
const isEnter = ref(false);
function enter(e: any) {
  if (e.keyCode === 13) {
    isEnter.value = true;

    getCloudsearch({ keywords: value.value }).then((v) => {
      isEnter.value = false;
      playList.value = v;
    });
  }
}
const songs = computed(() => {
  return playList.value?.result?.songs ?? [];
});
</script>

<template>
  <div class="search-page">
    <input type="text" v-model="value" @keyup="enter" />
    <LoadingBlock v-if="isEnter"></LoadingBlock>
    <h3 class="" v-if="songs.length === 0">没有任何数据</h3>
    <MusicList class="music-list" :tracks="songs"></MusicList>
  </div>
</template>

<style scoped lang="scss">
.search-page {
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;

  input {
    height: 2rem;
    width: 90%;
    margin: 1rem 0;
    padding: 0 1rem;
    box-sizing: border-box;

    border-radius: 2rem;
    outline: none;
    border: none;
    background-color: white;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
  .music-list {
    width: 100%;
  }
}
</style>
