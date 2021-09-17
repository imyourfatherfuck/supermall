<template>
  <div class="wrapper" ref="wrapper1">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "Scroll",
  data() {
    return {
      scroll: null,
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper1, {
      click: true,
      probeType: this.probeType
    })

    this.scroll.on('scroll', position => {
      this.$emit('scroll', position)
    })
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time)
    }

  }
}
</script>

<style scoped>

</style>