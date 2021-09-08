<template>
  <tab-bar>
    <tab-bar-item link="/home" activeColor="blue">
      <img slot="tab-icon" src="~assets/img/tabbar/home.png" alt="">
      <img slot="tab-icon-active" src="~assets/img/tabbar/home_active.png" alt="">
      <div slot="tab-text">首页</div>
    </tab-bar-item>
    <tab-bar-item link="/category" activeColor="blue">
      <img slot="tab-icon" src="~assets/img/tabbar/categories.png" alt="">
      <img slot="tab-icon-active" src="~assets/img/tabbar/categories_active.png" alt="">
      <div slot="tab-text">分类</div>
    </tab-bar-item>
    <tab-bar-item link="/cart" activeColor="blue">
      <img slot="tab-icon" src="~assets/img/tabbar/shopcart.png" alt="">
      <img slot="tab-icon-active" src="~assets/img/tabbar/shopcart_active.png" alt="">
      <div slot="tab-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item link="/profile" activeColor="blue">
      <img slot="tab-icon" src="~assets/img/tabbar/profile.png" alt="">
      <img slot="tab-icon-active" src="~assets/img/tabbar/profile_active.png" alt="">
      <div slot="tab-text">我的</div>
    </tab-bar-item>

  </tab-bar>
</template>

<script>
import TabBar from "@/components/common/tabbar/TabBar";
import TabBarItem from "@/components/common/tabbar/TabBarItem";
export default {
  name: "TabBarMain",
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style scoped>

</style>