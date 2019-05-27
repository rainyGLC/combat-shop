const Order = require('./../../models/order.js')
const Goods = require('./../../models/goods.js');
Page({
  data:{
    commodity:[],
    currentTab:0,
    aheight:'',
    skus:[]
  },
  onLoad:function(){
    this.getOrder();
  },
  getOrder:function(){
    Order.orderShow().then(res=>{
      console.log(res.code)
      if(res.code == 200){
        // console.log(res.dada.id)
        // console.log(res.data)
        let commodity = res.data;
        let skusData = []
        skusData = commodity.map(data=>data.skus)
        console.log(skusData);
        this.setData({commodity:res.data,skus:skusData})
        console.log(this.data.commodity);
        console.log(this.data.skus);
      }
    })
  },
  changeSlider:function(e){
    console.log(e);
    this.setData({
      currentTab:e.currentTarget.dataset.status
    })
  },
  swiperTab:function(e){
    this.setData({
      currentTab:e.detail.current
    })
  }
})

