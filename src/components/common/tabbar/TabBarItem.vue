<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="tab-icon"></slot></div>
    <div v-else><slot name="tab-icon-active"></slot></div>
    <div :style="isActiveColor"><slot name="tab-text"></slot></div>


  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  data() {
    return {
    }
  },
  props:{
    link: String,

    activeColor: {
      type: String,
      default: 'red'
    }
  },
  computed:{
    isActive() {
      return this.$route.path.indexOf(this.link) !== -1
    },
    isActiveColor() {
      return this.isActive? {color: this.activeColor}: {}
    }
  },
  methods: {
    itemClick() {
      this.$router.push(this.link)
    }
  }
}
</script>

<style scoped>
.tab-bar-item {
  flex:1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}

.tab-bar-item img{
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
}
</style>