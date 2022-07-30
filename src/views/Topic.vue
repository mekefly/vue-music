<script lang="ts" setup>
import MusicCard from "../components/MusicCard.vue";
</script>

<template>
  <MusicCard :limit="Number.POSITIVE_INFINITY" :item-limit="3"></MusicCard>
</template>

<style scoped></style>
