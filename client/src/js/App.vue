<template>
	<div id="app">
    <div class="container">
      <transition name="moveInUp">
		    <router-view/>
      </transition>
    </div>
	</div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
.moveInUp-leave-active{
  animation: moveInUp .3s ease-in;
}
@keyframes moveInUp{
 0%{
  transform: translateY(0);
 }
  100%{
  transform: translateY(-400px);
 }
}
</style>