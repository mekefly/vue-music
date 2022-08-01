<script setup lang="ts">
import { useFullScreen } from "./state/playState";
import Player from "./components/Player.vue";
import PlayList from "./components/PlayList.vue";
import PlayBar from "./components/PlayBar.vue";

const fullScreen = useFullScreen();
</script>

<template>
  <div class="app" :class="{ 'full-screen': fullScreen }">
    <RouterView v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </RouterView>
  </div>
  <Player></Player>
  <PlayBar></PlayBar>
  <PlayList></PlayList>
</template>

<style scoped lang="scss">
.app {
  display: flex;
  flex-direction: column;

  height: 100vh;
  max-width: var(--max-width);

  z-index: -1;
  &.full-screen {
    overflow: hidden;
  }
}
</style>
