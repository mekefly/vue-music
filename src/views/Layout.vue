<script lang="ts" setup>
import Nav from "../components/Nav.vue";
</script>

<template>
  <div class="layout">
    <Nav class="nav"></Nav>
    <div class="content">
      <RouterView v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
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
