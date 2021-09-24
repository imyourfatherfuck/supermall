import {debounce} from "common/utils";
import BackTop from "components/content/BackTop/BackTop";

export const backTopMixin = {
  data() {
    return {
      showBackTop: false
    }
  },
  components: {
    BackTop
  },
  methods: {
    backTop: function () {
      this.$refs.scroll.scrollTo(0, 0, 300);
    }
  }
}

export const itemListenerMixin = {
  data() {
    return {
      itemImageListener: null,
      refresh: null
    }
  },
  mounted() {
    this.refresh = debounce(this.$refs.scroll.refresh, 500)
    //监听图片加载完成
    this.itemImageListener = () => {
      this.refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImageListener)
  },
}