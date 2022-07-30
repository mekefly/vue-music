<script lang="ts" setup>
import { computed, Ref, ref, watch, watchEffect, onMounted } from "vue";
import { getLyricById } from "../api";
import { Lyric } from "../api/types";

const props = defineProps<{
  id: number | string | undefined | null;
  time: number;
}>();

/** 歌词请求得到的数据存放点 */
const LyricData: Ref<Lyric | null> = ref(null);
watchEffect(() => {
  LyricData.value = null;
  if (!props.id) {
    return;
  }
  //请求歌词
  getLyricById({ id: props.id }).then((v) => {
    LyricData.value = v;
  });
});

//歌词
const lyricList = computed(() => {
  const value = LyricData.value;

  if (!value) {
    return [];
  }

  const lyric = value?.lrc?.lyric;
  if (!lyric) {
    return [];
  }

  return lyric.split("\n").map((v) => {
    const value = v.match(/^(\[(\d\d):(\d\d\.\d{2,3})\])(.*)$/);

    if (value == null) {
      return { text: "", time: "", seconds: 0 };
    }
    const timeText = value[1];
    const minText = value[2];
    const secondText = value[3];
    const lyric = value[4];

    let min = parseInt(minText);
    if (isNaN(min)) {
      min = 0;
    }

    let second = parseFloat(secondText);
    if (isNaN(second)) {
      second = 0;
    }
    const seconds = min * 60 + second;

    return { lyric, timeText, seconds, dom: null as null | HTMLDivElement };
  });
});
//播放的index
const activeIndex = computed(() => {
  //二分查找比当前时间小的最大时间的index
  const time = props.time;
  const list = lyricList.value;

  let ret = list.length;
  let left = 0;
  let right = ret - 1;
  let mid, n;
  while (left <= right) {
    mid = (right + left) >> 1;
    n = list[mid].seconds;
    if (n >= time) {
      right = mid - 1;
    } else {
      ret = mid;
      left = mid + 1;
    }
  }
  return ret;
});

//歌词自动居中
watch(activeIndex, () => {
  const lrc = lyricList.value[activeIndex.value];
  lrc?.dom?.scrollIntoView({ behavior: "smooth", block: "center" });
});
</script>

<template>
  <div class="lyric">
    <p
      class="item"
      v-for="(lrc, index) in lyricList"
      :class="{ active: activeIndex === index }"
      :ref="(el) => (lrc.dom = el as any)"
    >
      {{ lrc.lyric }}
    </p>
  </div>
</template>

<style scoped lang="scss">
.lyric {
  display: flex;
  align-items: center;
  flex-direction: column;

  overflow: hidden;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0px;
  }
  .item {
    transition: 1s;
    transition-property: transform, font-size, font-weight, color, text-shadow;
    padding: 0 3rem;
    box-sizing: border-box;

    &.active {
      transform: scale(1.1);

      color: red;
      text-shadow: 0 0 3px red;
    }
  }
}
</style>
