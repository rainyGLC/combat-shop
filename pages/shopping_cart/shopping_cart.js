const Cart = require('./../../models/cart.js');
const Order = require('./../../models/order.js')
Page({
  data:{
    goods:[],//商品列表
    isSwitchover:false,//是否切换
    totalPrice:0, //总价，初始值为0
    selectAllStatus:false,//是否全选
  },
  onShow:function(option){
    this.getCart();
  },
  getCart:function(){
    Cart.cartShow().then(res=>{
      let goods = res.data;
      console.log(goods)
      goods.forEach((data,index)=>{
        data.isSelected = false
        return data
      })
      this.setData({goods:goods})
    })
  },
  //计算总价
  getTotalPrice(){
    let goods = this.data.goods;
    let total =  0;
    let selected;
    goods.forEach((data,index) => {
      if(data.isSelected){
        total += data.price * data.num;
      }
      if(!data.isSelected){
        selected = false
      }
    })
    if(selected == null){
      selected = true
    }
    this.setData({
      goods:goods,
      totalPrice:total,
      selectAllStatus:selected
    })
  },
  //切换编辑／完成
  handleChange:function(){
    let isSwitchover = !this.data.isSwitchover;
    this.setData({isSwitchover})
  },
  //全选
  handleAllselected:function(){
    let selectAllStatus = !this.data.selectAllStatus;
    let goods = this.data.goods;
    goods.forEach((data)=>{
      data.isSelected = selectAllStatus //改变所有商品状态
    })
    this.setData({
      selectAllStatus:selectAllStatus,
      goods:goods
    });
    this.getTotalPrice();
  },

  //单选
  handleSelected:function(e){
    // console.log(e)
    let index = e.currentTarget.dataset.index;
    let goods = this.data.goods;
    let isSelected = goods[index].isSelected; //获取当前商品的选中状态
    // console.log(isSelected);
    goods[index].isSelected = !isSelected;
    this.setData({
      goods:goods
    })
    this.getTotalPrice();
  },

  //增加数量
  bindPlus:function(e){
    let index = e.currentTarget.dataset.index;
    let goods = this.data.goods;
    let num = goods[index].num;
    let stock = goods[index].stock;
    if(num < stock) {
      num = num + 1;
    }
    goods[index].num = num;
    this.setData({
      goods:goods
    })
    this.getTotalPrice()
  },
  // 减少数量
  bindMinus:function(e){
    let index = e.currentTarget.dataset.index;
    let goods = this.data.goods;
    let num = goods[index].num;
    if(num == 1) {
      wx.showModal({
        title: '提示',
        content: '此商品为1，是否要删除',
        success:(res)=> {
          if (res.confirm) {
            goods.splice(index,1)
            this.setData({goods:goods})
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return false
    }
    num = num - 1;
    goods[index].num = num;
    this.setData({goods:goods})
    this.getTotalPrice();
  },
   //删除
  handleDelete:function(e){
    let goods = this.data.goods.filter(data=>data.isSelected ==false);//返回没有选中的
    this.setData({goods})
    this.getTotalPrice()
  },
  //提交订单
  handleSubmit:function(e){
    console.log(e);
    Order.orderCreat({}).then(res=>{
      console.log(res.data)
    })
  }

})