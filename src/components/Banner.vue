<script lang="ts" setup>
import { divRef } from "../utils/vue/refDom";
import { computed, onMounted, Ref, ref, watchEffect } from "vue";
import { BannerType, getBanner, GetBannerReturnType } from "../api/banner";

const screenDom = divRef();
const sliderDom = divRef();

const bannerData: Ref<GetBannerReturnType | null> = ref(null);
watchEffect(async () => {
  bannerData.value = await getBanner(BannerType.ANDROID);
});
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
onMounted(() => {
  let activeIndex = 0;

  //拖动到对应的页面

  //按下的状态
  let isMousedown = false;

  //按下鼠标时记录一个除始状态
  let mousedownPageX = 0;
  screenDom.value.addEventListener("mousedown", function (e) {
    isMousedown = true;
    mousedownPageX = e.pageX;
    screenDom.value.classList.add("mousedown");
  });

  document.addEventListener("mouseup", function (e) {
    //鼠标弹起时标准更新
    stdUpdate(e);
    isMousedown = false;
    screenDom.value.classList.remove("mousedown");
  });

  //循环运行
  setInterval(() => {
    if (!isMousedown) {
      activeIndex++;
      if (activeIndex >= len.value) {
        activeIndex = 0;
      }
      refreshRender();
    }
  }, 3000);

  /**
   * 这个更新会自动对齐
   * @param {*} e
   */
  function stdUpdate(e: MouseEvent) {
    if (isMousedown) {
      const left = getLeft(e.pageX);
      //当松开手指才会更新这个位置按住的时候只更新了页面的显示，没有更新它，
      //如果您需要页面显示渲染更新的一个index可以使用
      activeIndex = getActiveIndex(left);
      // activeIndex 代表当前要显示哪一个然后*一个屏幕宽度就是一个整数屏幕的位置，就对齐了
      render(-activeIndex * getScreenWidth(), activeIndex);
    }
  }
  let screenRect = screenDom.value.getBoundingClientRect();
  //windows resize
  window.addEventListener("resize", function () {
    screenRect = screenDom.value.getBoundingClientRect();

    refreshRender();
  });

  //移动
  document.addEventListener("mousemove", update);
  function update(e: MouseEvent) {
    if (isMousedown) {
      const left = getLeft(e.pageX);
      const index = getActiveIndex(left);
      render(left, index);
    }
  }

  function refreshRender() {
    const left = -activeIndex * getScreenWidth();
    render(left, activeIndex);
  }
  function render(left: number, index: number) {
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
    return getScreenRect().width;
  }
  function getScreenRect() {
    return screenRect;
  }
});
</script>

<template>
  <div class="screen" ref="screenDom" draggable="false">
    <div class="body" draggable="false">
      <div class="slider" ref="sliderDom" draggable="false">
        <div class="item" v-for="banner in banners" draggable="false">
          <a :href="banner.url" draggable="false">
            <img :src="banner.pic" :alt="banner.typeTitle" draggable="false" />
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