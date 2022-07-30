<script lang="ts" setup>
import { ref, Ref } from "vue";
import { useRoute } from "vue-router";
import MusicList from "../components/MusicList.vue";
import { getSearch, getCloudsearch } from "../api/index";

const playList: Ref<any> = ref({});

const route = useRoute();
const value = ref("");
function enter(e: any) {
  if (e.keyCode === 13) {
    getCloudsearch({ keywords: value.value }).then((v) => {
      playList.value = v;
    });
  }
}
</script>

<template>
  <div class="search-page">
    <input type="text" v-model="value" @keyup="enter" />
    <MusicList
      class="music-list"
      :tracks="playList?.result?.songs ?? []"
    ></MusicList>
  </div>
</template>

<style scoped lang="scss">
.search-page {
  display: flex;
  align-items: center;
  flex-direction: column;
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
