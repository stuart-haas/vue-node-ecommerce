<template>
  <transition name="slide">
    <aside ref="drawer" v-show="visible" class="drawer">
      <slot>
      </slot>
    </aside>
  </transition>
</template>

<script>
import { Events } from "../util/events"
export default {
  data() {
    return {
      visible: false
    }
  },
  mounted() {
    Events.$on('toggle-drawer', params => {
      this.visible = params.visible
      this.position()
    })
  },
  methods: {
    position() {
      this.$refs.drawer.style.top = document.getElementById('site-header').offsetHeight + 'px';
      this.$refs.drawer.style.height = window.innerHeight - document.getElementById('site-header').offsetHeight + 'px';
    }
  }
}
</script>

<style lang="scss" scoped>
aside.drawer {
  position: fixed;
  right: 0;
  top: 0;
  height: 100%;
  background: white;
}
.slide-enter-active, .slide-leave-active {
  transition: transform .3s cubic-bezier(0.86, 0, 0.07, 1);
}
.slide-enter, .slide-leave-to {
  transform: translateX(100%);
}
</style>