<script lang="ts" setup>
const labels = [
  { to: "/", label: "首页", active: true },
  { to: "/topic", label: "榜单" },
  { to: "/search", label: "搜索" },
  //api登录会提示环境异常所以没法写
  // { to: "/mine", label: "我的" },
  { to: "/about", label: "关于" },
];
</script>

<template>
  <ul>
    <li v-for="label in labels">
      <RouterLink exact-active-class="active" class="link" :to="label.to">{{
        label.label
      }}</RouterLink>
    </li>
  </ul>
</template>

<style scoped lang="sass">
ul
  display: flex
  justify-content: space-around
  align-content: center

  margin: 0
  padding: 0

  list-style: none
  text-decoration: none
  color: #000
  padding-bottom: 2px
  width: 100%
  background-color: #fff
  margin-bottom: 0.5em

  li
    width: 100%
    flex-shrink: 1

    .link
      display: flex
      justify-content: center
      align-items: center

      width: 100%
      height: 2em

      margin: 0px
      padding: 0px
      text-decoration: none
      color: #555
      font-size: 3em

      transition: all 0.3s
      border-bottom: 2px solid transparent
      box-sizing: border-box

      &.active
        color: red
        border-bottom-color: red
        text-shadow: 0 0 1px red
</style>
