<script lang="ts" setup>
import Nav from "../components/Nav.vue";
import LoadingBlock from "../components/LoadingBlock.vue";
import { usePreventIncompleteLoading } from "../utils/vue/use";

const { keepAliveIncludes, makeCache } = usePreventIncompleteLoading();
</script>

<template>
  <div class="layout">
    <Nav class="nav"></Nav>
    <div class="content">
      <RouterView v-slot="{ Component }">
        <KeepAlive :include="keepAliveIncludes">
          <Suspense timeout="0" @resolve="() => makeCache(Component)">
            <component :is="Component"></component>
            <template #fallback>
              <LoadingBlock></LoadingBlock>
            </template>
          </Suspense>
        </KeepAlive>
      </RouterView>
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  height: 100%;

  .nav {
    flex-shrink: 0;
  }
  .content {
    flex-grow: 1;
    overflow-y: auto;
  }
}
</style>
