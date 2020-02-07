<template>
  <ul>
    <li v-for="item in items"
      :key="item.index"
    >
      {{ item.title }}
    </li>
  </ul>
</template>

<script>
export default {
  data: function() {
    return {
      items: [
        {title: 'Menu Item 1'},
        {title: 'Menu Item 2'},
        {title: 'Menu Item 3'},
      ]
    }
  }
}
</script>

<style>

</style>