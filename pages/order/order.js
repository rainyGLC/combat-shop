// const Order = require('./../../models/order.js');

Page({
  data:{
    id:'',  //id
    cheap:'', //优惠
    express: '',//订单号
    freight:'',  //运费
    price:'', //商品总价
    skus:[],
    status:0,//状态
    addressMessage:[] //地址

  },
  onLoad:function(option){
    // let id = 1234;
    // let id = option.id || 1234
    this.getOrder()
  },
  getOrder:function(){
    wx.request({
      url:'https://www.easy-mock.com/mock/5ce018d44109c342d907b662/shop/order/1234',
      method:'GET',
      success:(res) => {
        // console.log(res.data)
        // console.log(res.data.data.id);
        console.log(res.data);
        // console.log(res.data.code)
        if(res.data.code==200){
          this.setData({
            id:res.data.data.id,
            cheap:res.data.data.cheap,
            express:res.data.data.express,
            freight:res.data.data.freight,
            price:res.data.data.price,
            skus:res.data.data.skus,
            // status:res.data.data.status
          })
          console.log(this.data.id);
        }
      },
      fail:(res)=>{
        console.log(res)
      }
    })
  },
  handleAddress:function(){
    console.log('123')
    wx.getSetting({
      success:(res)=> {
        console.log(res)
        if (!res.authSetting['scope.address']) {
          wx.authorize({
            scope: 'scope.address',
            success() {
              wx.chooseAddress({
                success: res => {
                  console.log(res);
                  let addressMessage = res;
                  this.setData({addressMessage:addressMessage,status:1});
                  console.log(this.data.addressMessage);
                }
              })
            }
          })
        }else{
          wx.chooseAddress({
            success: res => {
              console.log(res);
              let addressMessage = res;
              this.setData({addressMessage:addressMessage,status:1});
            }
          })
        }
      },
      fail(res){
        console.log(res)
      }
    })
  },
  handleAccount:function(){
    console.log('1234')
  }
})








