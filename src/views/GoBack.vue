<script lang="ts" setup></script>

<template>
  <div class="go-back">
    <div class="header">
      <i
        class="fa-solid fa-angle-left"
        @click="
          () => {
            $router.back();
          }
        "
      ></i>
      <span>{{ $route.params.pageName }}</span>
      <span></span>
    </div>
    <div class="content">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<style scoped lang="scss">
.go-back {
  display: flex;
  flex-direction: column;
  height: 100%;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 0 1em;
    box-sizing: border-box;
    height: 3em;
    flex-shrink: 0;

    background-color: white;
    font-size: 2em;

    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    font-weight: bold;
  }
  .content {
    flex-grow: 1;
    overflow-y: auto;
  }
}
</style>
