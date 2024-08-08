<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      checkede: true,
      score: 5
    }
  }
}
</script>

<style lang="less">
  .box{
    width: 300px;
    height: 300px;
    background-color: pink;
  }
</style>
