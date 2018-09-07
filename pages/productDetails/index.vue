<template>

</template>

<script>
export default {
  name: "productDetails",
  asyncData({ route, redirect }) {
    let id = route.params.id || '',
      type = route.params.type;
    // id/type无效，返回首页
    if (!(id.length === 36 && (type === "0" || type === "1"))) {
      return redirect("/");
    }
  },
};
</script>

