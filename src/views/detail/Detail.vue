<template>
  <div>
    <detail-nav-bar/>
    <detail-swipper :top-images="topImages"/>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwipper from "./childComps/DetailSwipper";
import {getDetail} from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwipper
  },
  data() {
    return {
      iid: null,
      topImages: []
    }
  },
  created() {
    this.iid = this.$route.params.iid
    getDetail(this.iid).then(res => {
      console.log(res);
      this.topImages = res.result.itemInfo.topImages
    })
  },
  destroyed() {
    console.log(123);
  }
}
</script>

<style scoped>

</style>