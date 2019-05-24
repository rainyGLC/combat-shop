const Banner = require('./../../models/banner.js');
const Recommend = require('./../../models/recommend.js');

Page({
  data: {
    imgUrls:[],
    recommend:[]
  },
  onLoad:function(){
    this.getBanner();
    this.getRecommend();
  },
  getBanner:function(){
    Banner.bannerShow().then(res=>{
      console.log(res.data);
      this.setData({imgUrls:res.data})
    })
  },
  getRecommend:function() {
    Recommend.recommendShow().then(res=>{
      console.log(res.data);
      this.setData({recommend:res.data})
    })
  },
  handleChange:function(e){
    console.log(e)
  }
})
