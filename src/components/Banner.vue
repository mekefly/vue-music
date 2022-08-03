<script lang="ts" setup>
import { useEventListener, useIntervalFn } from "@vueuse/core";
import { divRef } from "../utils/vue/refDom";
import { computed, onMounted, Ref, ref, watchEffect } from "vue";
import { BannerType, getBanner, GetBannerReturnType } from "../api/banner";

const screenDom: Ref<HTMLDivElement | null> = divRef();
const sliderDom: Ref<HTMLDivElement | null> = divRef();

const bannerData: Ref<GetBannerReturnType | null> = ref(
  await getBanner(BannerType.ANDROID)
);

const banners: Ref<GetBannerReturnType["banners"]> = computed(() => {
  const value = bannerData.value;
  if (!value) {
    return [];
  }
  return value?.banners ?? [];
});
const len = computed(() => {
  return banners.value.length;
});
let activeIndex = 0;

//拖动到对应的页面

//按下的状态
let isMousedown = false;

//按下鼠标时记录一个除始状态
let mousedownPageX = 0;
function mousedown(e: MouseEvent) {
  console.log(e);

  down(e.pageX);
}
function touchdown(e: TouchEvent) {
  down(e.targetTouches[0].pageX);
}
function down(pageX: number) {
  isMousedown = true;
  mousedownPageX = pageX;
  screenDom.value?.classList.add("mousedown");
}

useEventListener(document, "mouseup", mouseup);
useEventListener(document, "touchend", touchup);
function mouseup(e: MouseEvent) {
  up(e.pageX);
}
function touchup(e: TouchEvent) {
  up(e.changedTouches[0].pageX);
}

function up(pageX: number) {
  stdUpdate(pageX);
  isMousedown = false;
  screenDom.value?.classList.remove("mousedown");
}

//循环运行
setInterval(() => {
  if (!isMousedown) {
    activeIndex++;
    if (activeIndex >= len.value) {
      activeIndex = 0;
    }
    resize();
    refreshRender();
  }
}, 3000);

/**
 * 这个更新会自动对齐
 * @param {*} e
 */
function stdUpdate(pageX: number) {
  if (isMousedown) {
    const left = getLeft(pageX);
    //当松开手指才会更新这个位置按住的时候只更新了页面的显示，没有更新它，
    //如果您需要页面显示渲染更新的一个index可以使用
    activeIndex = getActiveIndex(left);
    // activeIndex 代表当前要显示哪一个然后*一个屏幕宽度就是一个整数屏幕的位置，就对齐了
    render(-activeIndex * getScreenWidth(), activeIndex);
  }
}
let screenRect: DOMRect | null | undefined = null;

onMounted(resize);
useEventListener(screenDom.value, "DOMContentLoaded", resize);
useEventListener(window, "resize", resize);
function resize() {
  if (!screenDom.value) {
    return;
  }
  screenRect = screenDom.value.getBoundingClientRect();

  refreshRender();
}

//移动
useEventListener(document, "mousemove", (e) => update(e.pageX));
useEventListener(document, "touchmove", (e) =>
  update(e.targetTouches[0].pageX)
);
function update(pageX: number) {
  if (isMousedown) {
    const left = getLeft(pageX);
    const index = getActiveIndex(left);
    render(left, index);
  }
}

function refreshRender() {
  const left = -activeIndex * getScreenWidth();
  render(left, activeIndex);
}
function render(left: number, index: number) {
  if (!sliderDom.value) {
    return;
  }
  sliderDom.value.style.transform = `translate(${left}px)`;
}

function getLeft(pageX: number) {
  const left = -activeIndex * getScreenWidth() + pageX - mousedownPageX;
  return left;
}
function getActiveIndex(left: number) {
  const width = getScreenWidth();
  //left是负数，最终要得到正数index
  const i = Math.floor((-left + width / 2) / width);
  if (i < 0) {
    return 0;
  }
  if (i >= len.value - 1) {
    return len.value - 1;
  }
  return i;
}

function getScreenWidth() {
  const rect = getScreenRect();

  if (!rect) {
    return 0;
  }
  return rect.width;
}
function getScreenRect() {
  return screenRect;
}

function dragDetection(e: MouseEvent) {
  if (Math.abs(e.pageX - mousedownPageX) > 10) {
    e.preventDefault();
  }
}
</script>

<template>
  <div
    class="screen"
    draggable="false"
    ref="screenDom"
    @mousedown="mousedown"
    @touchstart="touchdown"
  >
    <div class="body" draggable="false">
      <div class="slider" ref="sliderDom" draggable="false">
        <div class="item" v-for="banner in banners" draggable="false">
          <a :href="banner.url" draggable="false">
            <img
              :src="banner.pic"
              :alt="banner.typeTitle"
              draggable="false"
              @click="dragDetection"
            />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.screen {
  display: flex;
  flex-direction: column;

  width: 100%;
  flex-shrink: 0;

  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  transition: 0.5s;
  transition-property: height, width, border-radius;
  overflow: hidden;

  * {
    user-select: none;
  }

  .body {
    flex-grow: 1;

    .slider {
      display: flex;

      // height: min-content;
      width: 100%;

      transition: transform 0.3s ease-out;

      .item {
        flex-shrink: 0;

        // height: min-content;
        width: 100%;

        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        img {
          width: 100%;
          height: auto;
        }
      }
    }
  }

  &.mousedown .body .slider {
    transition: none;
  }
}
</style>
