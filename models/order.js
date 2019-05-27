const request = require('./request.js');
const api = require('./api.js');


module.exports = {
  //创建订单
  orderCreat(params){
    return request({
      url:api.order,
      method:'post',
      data:params
    })
  },
  orderIdShow(params){
    return request({
      url:api.orderId(id),
      method:'get',
      data:params
    })
  },
  orderShow(params){
    return request({
      url: api.order,
      method:'GET',
      data:params
    })
  }
}
