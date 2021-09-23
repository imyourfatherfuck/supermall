import {debounce} from "common/utils";
export const itemListenerMixin = {
  data(){
    return {
        itemImageListener: null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 500)
    //监听图片加载完成
    this.itemImageListener = () => {
      refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImageListener)
    console.log('混入');
  },
}