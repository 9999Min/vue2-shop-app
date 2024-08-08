import request from '@/utils/request'

// 商品详情页添加到购物车
export const addGoodsToCart = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/add', {
    goodsId, // 商品id
    goodsNum, // 商品的数量
    goodsSkuId // 商品规格Id
  })
}

// 获取购物车商品列表
export const getCartGoodsList = () => {
  return request.get('/cart/list')
}

// 更新购物车列表
export const changeCount = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('cart/update', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

// 删除购物车商品
export const deleGoods = (cartIds) => {
  return request.post('cart/clear', {
    cartIds
  })
}
