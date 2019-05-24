const request = require('./request.js');
const api = require('./api.js');

module.exports = {
  cartInsert(params){
    return request({
      url:api.cart,
      method:'post',
      data:params
    })
  },
  cartShow(params){
    return request({
      url:api.cart,
      method:'get',
      data:params
    })
  }
}