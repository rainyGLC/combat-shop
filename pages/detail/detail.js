const Goods = require('./../../models/goods.js');
const Cart = require('./../../models/cart.js');
Page({
   data:{
    previews:[],
    skus:[],
    details:[],
    show:true,
    skusId:null, //id
    skusSize:null,//大小
    skusColor:null,//color颜色
    skusStock:null,//库存 8
    skusImage_url:null,//图片
    skusCount:0,//当前数量
    minusStatus:'disabled'// 使用data数据对象设置样式名  
   },
   onLoad:function(option){
    let id = option.id || 1;
    this.getGoodid(id)
   },
   getGoodid:function(id){
    Goods.goodsIdShow(id).then(res=>{
      console.log(res)
      let previews = res.data.previews;
      let details = res.data.details;
      let skus= res.skus;
      let skusArryId = res.skus[0];
      let skusId = skusArryId.id;
      let skusSize = skusArryId.size;
      let skusColor = skusArryId.color;
      let skusStock = skusArryId.stock;
      let skusImage_url=skusArryId.image_url;
      this.setData({
        previews,
        skus,
        details,
        skusId,
        skusSize,
        skusColor,
        skusStock,
        skusImage_url
      })
    })
   },
   hanldSelected:function(e){
    console.log(e)
    let show = false;
    this.setData({show})
   },
   hindeBtn:function(e){
    let show=true;
    this.setData({show})
   },
   handleChange:function(e){
    // console.log(e);
    let id = e.currentTarget.dataset.id;
    // console.log(id);
    let size= e.currentTarget.dataset.size;
    // console.log(size)
    let color=e.currentTarget.dataset.color;
    // console.log(color)
    let stock= e.currentTarget.dataset.stock;
    // console.log(stock)
    let image_url =e.currentTarget.dataset.image_url;
    // console.log(image_url)
    this.setData({
      skusId:id,
      skusSize:size,
      skusColor:color,
      skusStock:stock,
      skusImage_url:image_url
    })
   },
   bindMinus:function(){
    let skusCount = this.data.skusCount;
    if(skusCount > 0){
      skusCount --
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态
    let minusStatus = skusCount <= 0 ?'disabled' : 'normal';
    this.setData({
      skusCount:skusCount,
      minusStatus:minusStatus
    })

   },
   bindManual:function(e){
    let skusCount = e.detail.value;
    this.setData({
      skusCount:skusCount
    })

   },
   bindPlus:function(){
    let skusStock = this.data.skusStock
    let skusCount = this.data.skusCount;
    if(skusCount < skusStock){
      skusCount ++;
    }
     // 只有小于库存的时候，才能normal状态，否则disable状态 
    let minusStatus = skusCount < skusStock ? 'normal' : 'disabled';
    this.setData({
      skusCount:skusCount,
      minusStatus:minusStatus
    })
   },
   handldSubmit:function(){
    let show=true;
    this.setData({show})
    let sku_id = this.data.skusId;
    let number = this.data.skusCount;
    Cart.cartInsert({sku_id,number}).then(res=>{
      console.log(res)
      if(res.code==200){
        console.log("提交成功")
      }
    })
   }

})















