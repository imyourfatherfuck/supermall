<template>
  <div id="home">
    <nav-bar class="home-bar">
      <div slot="center">购物街</div>
    </nav-bar>

    <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true" @scroll="contentScroll" @pullingUp='loadMore'>
      <home-swiper :banners="banners"/>

      <recommend-view :recommends="recommends"/>

      <feature-view/>

      <tab-control class="tab-control" :titles="['潮流', '精选', '时尚']" @tabClick="tabClick"></tab-control>

      <goods-list :goods="showGoods"/>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import Scroll from "components/common/Scroll/Scroll";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/Goods/GoodsList";
import BackTop from "components/content/BackTop/BackTop";

import HomeSwiper from "./childComps/HomeSwiper"
import RecommendView from "./childComps/RecommendView"
import FeatureView from "./childComps/FeatureView"

import {getHomeMultidata, getHomeGoods} from "network/home"
import {debounce} from "common/utils";

export default {
  name: "Home",
  components: {
    NavBar,
    Scroll,
    TabControl,
    GoodsList,
    BackTop,

    HomeSwiper,
    RecommendView,
    FeatureView
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      },
      currentType: 'pop',
      isShowBackTop: false

    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  created() {
    this.getHomeMultidata()

    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 500)
    //监听图片加载完成
    this.$bus.$on('itemImageLoad', () => {
      refresh()
    })
  },
  methods: {

    /**
     * 事件监听
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    contentScroll(position) {
      this.isShowBackTop = (-position.y) > 1000
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
    },

    /**
     * 网络请求
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;
  position: relative;
}

.home-bar {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
