<script lang="ts" setup>
import { Directive } from "vue";
import { useRoute } from "vue-router";
import { activate_init_profile } from "../../NeteaseCloudMusicApi/interface";
import { router } from "../router/index";
const route = useRoute();
</script>

<template>
  <div class="header">
    <i
      class="fa-solid fa-angle-left"
      @click="
        () => {
          $router.back();
        }
      "
    ></i>
    <span>{{ route.params.pageName }}</span>
    <span></span>
  </div>
  <RouterView></RouterView>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 1em;
  box-sizing: border-box;
  height: 4em;
  flex-shrink: 0;

  background-color: white;
  font-size: 2em;

  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  font-weight: bold;
}
</style>
