<script lang="ts" setup>
import { ref, Ref, computed } from "vue";
import MusicList from "../components/MusicList.vue";
import { getCloudsearch } from "../api/index";
import LoadingBlock from "../components/LoadingBlock.vue";

//搜索请求的返回值
const playList: Ref<any> = ref(null);

//搜索框中的内容
const value = ref("");

//是否在加载的状态
const isLoading = ref(false);
//是否已经点击了搜索按钮
const searched = ref(false);
/** keyup enter */
async function enter(e: any) {
  if (e.keyCode === 13) {
    isLoading.value = true;
    playList.value = await getCloudsearch({ keywords: value.value });
    isLoading.value = false;
    searched.value = true;
  }
}
//歌曲列表
const songs = computed(() => {
  return playList.value?.result?.songs ?? [];
});
</script>

<template>
  <div class="search-page">
    <input
      type="text"
      v-model="value"
      @keyup="enter"
      placeholder="Enter a song name to start the search"
    />
    <LoadingBlock v-if="isLoading"></LoadingBlock>
    <h3 class="" v-if="searched && songs.length === 0">没有任何数据</h3>
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
    height: 2em;
    width: 90%;
    margin: 1em 0;
    padding: 0 1em;
    box-sizing: border-box;

    border-radius: 2em;
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
