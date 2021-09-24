<template>
  <div id="home">
    <nav-bar class="home-bar">
      <div slot="center">购物街</div>
    </nav-bar>

    <tab-control :titles="['潮流', '精选', '时尚']" @tabClick="tabClick" v-show="isTabFixed" class="tab-control"
                 ref="topTabControl"/>

    <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true" @scroll="contentScroll"
            @pullingUp='loadMore'>
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>

      <recommend-view :recommends="recommends"/>

      <feature-view/>

      <tab-control :titles="['潮流', '精选', '时尚']" @tabClick="tabClick" ref="tabControl"/>

      <goods-list :goods="showGoods"/>
    </scroll>

    <back-top @click.native="backTop" v-show="showBackTop"/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import Scroll from "components/common/scroll/Scroll";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/Goods/GoodsList";


import HomeSwiper from "./childComps/HomeSwiper"
import RecommendView from "./childComps/RecommendView"
import FeatureView from "./childComps/FeatureView"

import {getHomeMultidata, getHomeGoods} from "network/home"
import {itemListenerMixin, backTopMixin} from "common/mixin";


export default {
  name: "Home",
  components: {
    NavBar,
    Scroll,
    TabControl,
    GoodsList,

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
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  mixins: [itemListenerMixin, backTopMixin],
  created() {
    this.getHomeMultidata()

    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    //回来时最好刷新一次，不然有奇怪bug
    this.$refs.scroll.refresh()
  },
  deactivated() {
    //保存Y值
    this.saveY = this.$refs.scroll.getScrollY()

    //取消全局监听事件
    this.$bus.$off('itemImageLoad', this.itemImageListener)
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
      this.$refs.tabControl.currentIndex = index
      this.$refs.topTabControl.currentIndex = index
    },
    contentScroll(position) {
      //backTop 是否显示
      this.showBackTop = (-position.y) > 1000

      //tabControl是否吸顶
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
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
        //完成上拉加载更多
        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}

.home-bar {
  background-color: var(--color-tint);
  color: #fff;
}


.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab-control {
  position: relative;
  z-index: 9;
}

</style>
