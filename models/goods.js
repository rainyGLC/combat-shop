const request = require('./request.js');
const api = require('./api.js');

module.exports = {
  //商品列表
  goodsShow(params){
    return request({
      url:api.goods,
      method:'get',
      data:params
    })
  },
  //商品详情
  goodsIdShow(id,params){
    return request({
      url:api.goodsId(id),
      method:'get',
      data: params
    })
  }
}