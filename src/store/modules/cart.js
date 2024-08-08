import { getCartGoodsList, changeCount, deleGoods } from '@/api/cartApi'

export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  getters: {
    // 购物车数据动态计算

    // 所有商品数量
    cartTotal (state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 勾选中的商品项
    selCartList (state) {
      return state.cartList.filter(item => item.isChecked)
    },
    // 选中的总数
    selCount (state, getters) {
      return getters.selCartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中的商品总价
    selPrice (state, getters) {
      return getters.selCartList.reduce((sum, item) => sum + item.goods_num * item.goods.goods_price_min, 0).toFixed(2)
    },
    // 是否全选
    isAllChecked (state) {
      return state.cartList.every(item => item.isChecked === true)
    }
  },
  mutations: {
    // 提供一个设置cartList的mutation
    setCartList (state, newList) {
      state.cartList = newList
    },
    // 商品选中状态
    toggleCheck (state, id) {
      // 找到对应id的商品，对其选中状态取反
      const good = state.cartList.find(item => item.goods_id === id)
      good.isChecked = !good.isChecked
    },
    // 商品全选状态
    toggleAllCheck (state, status) {
      state.cartList.forEach(item => { item.isChecked = status })
    },
    // 本地更新
    localChange (state, { id, num }) {
      const targetGood = state.cartList.find(item => item.goods_id === id)
      targetGood.goods_num = num
    }
  },
  actions: {
    // 获取购物车列表
    async getCartAction (context) {
      const { data } = await getCartGoodsList()
      // 后台返回的数据中不包含复选框的选择状态，需要手动维护数据，给每一项添加一个ischecked状态，标记当前商品是否选中
      data.list.forEach(item => {
        item.isChecked = true
      })
      context.commit('setCartList', data.list)
    },
    // 改变商品数量
    async changeCountAction (context, obj) {
      const { num, id, skuId } = obj
      // 先通过mutation本地修改，传递id num修改
      context.commit('localChange', { id, num })
      // 在同步到后台
      await changeCount(id, num, skuId)
    },
    // 删除商品
    async deleGoods (context) {
      const selCartList = context.getters.selCartList
      const cartIds = selCartList.map(item => item.id)
      await deleGoods(cartIds)
      // 重新拉取最新的购物车数据 (重新渲染)
      context.dispatch('getCartAction')
    }
  }
}
