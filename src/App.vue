<script setup lang="ts">
import { Suspense } from "vue";
import Player from "./components/Player.vue";
import PlayList from "./components/PlayList.vue";
import PlayBar from "./components/PlayBar.vue";
import LoadingBlock from "./components/LoadingBlock.vue";
import { usePreventIncompleteLoading } from "./utils";

//异步setup的加载动画，和组件缓存配置，不是自动缓存的原因之一就是哪怕异步组件未执行完成也会缓存，
//这样会导致内部错误在还原缓存时报错
const { keepAliveIncludes, makeCache } = usePreventIncompleteLoading();
</script>

<template>
  <!-- RouterView 路由显示组件 -->
  <RouterView v-slot="{ Component }">
    <!-- KeepAlive缓存组件加载状态在切换路由回来时不会从新加载调用setup -->
    <KeepAlive :include="keepAliveIncludes">
      <Suspense timeout="0" @resolve="() => makeCache(Component)">
        <!-- Suspense 负责异步setup的处理，内存可以包裹async setup而不会报错，这是一个实验性api -->
        <!-- resolve 是 setup返回resolve状态的调用 -->
        <!-- makeCache是我告诉keepAlive这个组件现在可以缓存了 -->

        <template #default>
          <div class="app">
            <!-- component 将会渲染is 中的内容，它可以传入一个文本将会渲染文本对应的组件，传入一个组件将渲染这个组件 -->
            <component :is="Component"></component>
          </div>
        </template>
        <!-- fallback 当超过一定时间内没有返回 setup调用完成时将会加载等待中组件 -->
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
