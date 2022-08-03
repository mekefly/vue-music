<script setup lang="ts">
import { Suspense } from "vue";
import { useFullScreen } from "./state/playState";
import Player from "./components/Player.vue";
import PlayList from "./components/PlayList.vue";
import PlayBar from "./components/PlayBar.vue";
import LoadingBlock from "./components/LoadingBlock.vue";
import { usePreventIncompleteLoading } from "./utils";

const fullScreen = useFullScreen();

const { keepAliveIncludes, makeCache } = usePreventIncompleteLoading();
</script>

<template>
  <RouterView v-slot="{ Component }">
    <KeepAlive :include="keepAliveIncludes">
      <Suspense timeout="0" @resolve="() => makeCache(Component)">
        <template #default>
          <div class="app">
            <component :is="Component"></component>
          </div>
        </template>
        <template #fallback>
          <LoadingBlock></LoadingBlock>
        </template>
      </Suspense>
    </KeepAlive>
  </RouterView>
  <Player></Player>
  <PlayBar></PlayBar>
  <PlayList></PlayList>
</template>

<style scoped lang="scss">
.app {
  display: flex;
  flex-direction: column;

  height: 100%;
  width: 100%;
  max-width: var(--max-width);
  flex-grow: 1;
  flex-shrink: 1;

  overflow-y: auto;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
</style>
