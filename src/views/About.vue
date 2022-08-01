<script lang="ts" setup>
import { computed, onActivated, onMounted, onUpdated, ref } from "vue";
import RowButton from "../components/RowButton.vue";
import { clearCache } from "../utils/cache/intelligentCleaning";
import {
  intelligentCleaning,
  clearMemoryCache,
  getMemoryCacheLength,
} from "../utils/cache";
const localStorage = ref(window.localStorage);
const len = ref(0);
function updateLen() {
  len.value = localStorage.value.length;
}
onActivated(updateLen);
const size = ref(0);
function updateSize() {
  let s = 0;
  const storage = localStorage.value;

  for (let i = 0; i < len.value; i++) {
    const key = storage.key(i);
    if (!key) {
      continue;
    }
    const value = storage.getItem(key);
    if (!value) {
      continue;
    }
    s += value.length;
  }

  size.value = s;
}
onActivated(updateSize);
function clearCacheHandle() {
  const r = confirm("您确认要清除所有缓存吗");
  if (r == true) {
    clearCache();
    updateSize();
    updateLen();
  }
}
function intelligentCleaningHandle() {
  intelligentCleaning();
  updateSize();
  alert("清理完成");
}
const memoryCacheLength = ref(0);
function updateMemoryCacheLengthHandle() {
  memoryCacheLength.value = getMemoryCacheLength();
}
onActivated(updateMemoryCacheLengthHandle);
onMounted(updateMemoryCacheLengthHandle);
function clearMemoryCacheHandle() {
  clearMemoryCache();
  updateMemoryCacheLengthHandle();
  alert("清理完毕");
}
</script>

<template>
  <RowButton
    value="请不要用于非法用途，请不要滥用，不要从入门到入狱"
    no-arrow
  ></RowButton>
  <RowButton value="仅可以学习使用" no-arrow></RowButton>
  <RowButton value="api 来自网易云" src="https://music.163.com/"></RowButton>
  <RowButton
    value="开发者：mekefly"
    src="https://github.com/mekefly"
  ></RowButton>
  <RowButton
    value="哔哩哔哩"
    src="https://space.bilibili.com/316419619?spm_id_from=333.1007.0.0"
  ></RowButton>
  <RowButton
    :value="`清理缓存(${len}条|${(size / 1024).toFixed(2) + 'KB'})`"
    @click="clearCacheHandle"
  ></RowButton>
  <RowButton
    :value="`智能清理缓存(清理已过期的)`"
    @click="intelligentCleaningHandle"
  ></RowButton>
  <RowButton
    :value="`清空内存缓存(${memoryCacheLength})`"
    @click="clearMemoryCacheHandle"
    @mouseenter="updateMemoryCacheLengthHandle"
  ></RowButton>
</template>

<style scoped></style>
