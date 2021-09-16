<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :goodsItem="item"/>
  </div>
</template>

<script>

import GoodsListItem from "components/content/Goods/GoodsListItem";

export default {
  name: "GoodsList",
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    GoodsListItem
  }

}
</script>

<style scoped>

.goods {
  display: flex;
  flex-flow: wrap;
  justify-content: space-around;
}
</style>