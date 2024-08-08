<template>
  <div>
    <router-view/>
   <van-tabbar  route v-model="active" active-color="red">
    <van-tabbar-item icon="wap-home-o" to="/home">首页</van-tabbar-item>
    <van-tabbar-item icon="apps-o" to="/category">分类页</van-tabbar-item>
    <van-tabbar-item icon="shopping-cart-o" to="/cart">购物车</van-tabbar-item>
    <van-tabbar-item icon="user-o" to="/user">我的</van-tabbar-item>
  </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style>

</style>
