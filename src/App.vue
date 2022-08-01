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
  position: absolute;
  left: 50%;

  display: flex;
  flex-direction: column;

  min-height: 100%;
  width: 100%;
  max-width: var(--max-width);
  flex-grow: 1;

  z-index: -1;
  transform: translateX(-50%);

  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  &.full-screen {
    overflow: hidden;
  }
}
</style>
