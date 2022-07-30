<script lang="ts" setup>
import Loading from "./Loading.vue";
</script>

<template>
  <div class="loading-block">
    <Loading></Loading>
  </div>
</template>

<style scoped>
.loading-block {
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
  width: 100%;
  flex-grow: 1;
}
</style>
