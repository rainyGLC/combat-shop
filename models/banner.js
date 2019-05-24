const request = require('./request.js');
const api = require('./api.js');

module.exports = {
  bannerShow(params){
    return request({
      url:api.banner,
      method:'get',
      data:params
    })
  }
}