import request from '@/utils/request'

// 获取搜索商品列表的数据
export const getProductList = (obj) => {
  const { categoryId, goodsName, page } = obj
  return request.get('/goods/list', {
    params: {
      categoryId,
      goodsName,
      page
    }
  })
}
// 获取商品详情数据
export const getProDetail = (goodsId) => {
  return request.get('/goods/detail', {
    params: {
      goodsId
    }
  })
}

// 获取商品评价
export const getProCom = (goodsId) => {
  return request.get('comment/listRows', {
    params: {
      goodsId,
      limit: 3
    }
  })
}
