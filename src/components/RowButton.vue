<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    value?: string;
    noArrow?: boolean;
    src?: string;
  }>(),
  { value: "按钮", noArrow: false }
);

//点击事件，检测是否有src有的话就进入对应的页面
function clickHandle() {
  const src = props.src;
  if (src) {
    location.href = src;
  }
}
</script>

<template>
  <button @click="clickHandle">
    <slot name="icon"></slot>
    <slot>
      <span>{{ value }}</span>
    </slot>
    <i v-if="!noArrow" class="fa-solid fa-angle-right"></i>
  </button>
</template>

<style scoped lang="scss">
button {
  display: flex;
  align-items: center;
  justify-content: space-between;

  text-align: left;
  background-color: white;
  border: none;
  outline: none;
  width: 100%;
  margin-bottom: 1px;
  padding: 1em 1em;

  font-size: 1.5em;

  &:active {
    background-color: #ddd;
  }
}
</style>
