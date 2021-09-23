<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar"/>
    <scroll class="content" ref="scroll">
      <detail-swipper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo"/>
      <detail-comment-info :comment-info="commentInfo"/>
      <goods-list :goods="recommends"/>
    </scroll>
  </div>
</template>

<script>
import {getDetail, getRecommend, Goods, Shop, GoodsParam} from "network/detail";
import Scroll from "components/common/Scroll/Scroll";
import {debounce} from "common/utils";

import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwipper from "./childComps/DetailSwipper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";

import GoodsList from "components/content/Goods/GoodsList";
import {itemListenerMixin} from "common/mixin";


export default {
  name: "Detail",
  components: {
    Scroll,

    DetailNavBar,
    DetailSwipper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,

    GoodsList
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: []
    }
  },
  mixins: [itemListenerMixin],
  created() {
    //保存传入的iid
    this.iid = this.$route.params.iid

    //根据iid获取数据
    getDetail(this.iid).then(res => {
      const data = res.result
      this.topImages = data.itemInfo.topImages


      //获取商品数据
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      //店铺信息
      this.shop = new Shop(data.shopInfo)

      //保存商品详情数据
      this.detailInfo = data.detailInfo

      //获取商品参数
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      //获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })

    //请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 500)
    //监听图片加载完成
    this.itemImageListener = () => {
      refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImageListener)
  },
  destroyed() {
    this.$bus.$off('itemImageLoad', this.itemImageListener)
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh()
    }
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 10;
  background-color: #fff;
  height: 100vh;
}

.detail-nav-bar {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px);
}
</style>