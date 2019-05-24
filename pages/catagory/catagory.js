const Catagory = require('./../../models/catagory.js');
const Goods = require('./../../models/goods.js');

Page({
  data:{
    catagory:[],
    goods:[],
    currentTab:0
  },
  onLoad:function(){
    this.getCatagory();
    this.getGoods();
    this.getGoodsId();
  },
  getCatagory:function(){
    let activeIndex = this.data.activeIndex;
    Catagory.catagoryShow().then(res=>{
      // console.log(res.data,'ooop');
      this.setData({catagory:res.data})
    })
    let catagory = this.data.catagory;
    // console.log(catagory.length,'pppp')
  },
  getGoods:function(){
    Goods.goodsShow().then(res=>{
      // console.log(res.data)
      this.setData({goods:res.data})
    })
  },
  getGoodsId:function(e){
    let catagory_id = this.data.currentTab;
    Goods.goodsShow({catagory_id}).then(res=>{
      console.log(res.data,'lll')
      this.setData({goods:res.data})
    })
  },
  changeSlider:function(e){
    console.log(e);
    this.setData({
      currentTab:e.currentTarget.dataset.id
    })
    this.getGood;
  },
  swiperTab:function(e){
    console.log(e);
    console.log(e.detail.current)
    this.setData({
      currentTab:e.detail.current
    })
  }
})

















