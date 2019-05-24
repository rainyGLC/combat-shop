const request = require('./request.js');
const api = require('./api.js');

module.exports = {
  catagoryShow(params){
    return request({
      url:api.catagory,
      method:'get',
      data:params
    })
  }
}