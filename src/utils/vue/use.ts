import { computed, Ref, ref, VNode } from "vue";

export function usePreventIncompleteLoading() {
  //对于已经加载完成的页面才可以缓存，这个回调是已加载完成的回调用

  //set防止重复
  const keepAliveIncludeSet: Ref<Set<any>> = ref(new Set());
  //只有新添加才会从新计算
  const keepAliveIncludeArray = computed(() => [...keepAliveIncludeSet.value]);

  function suspenseResolveHandle(Component: VNode) {
    if (!Component) {
      return;
    }

    const tt: any = Component.type;

    //name可能手动配置，__name是自动生成的
    keepAliveIncludeSet.value.add(tt.name ?? tt.__name);
  }
  return {
    keepAliveIncludes: keepAliveIncludeArray,
    makeCache: suspenseResolveHandle,
  };
}
