<script lang="ts" setup>
import Nav from "../components/Nav.vue";
</script>

<template>
  <Nav></Nav>
  <RouterView v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </RouterView>
</template>

<style scoped>
.header {
}
</style>
