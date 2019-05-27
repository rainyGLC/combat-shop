//app.js
App({
  onLaunch:function(){
    this.getUserInfo()
  },
  //回调函数
  getUserInfo(callback){
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo;
              // console.log(this.globalData.userInfo,'ooo');
              typeof callback === 'function' && callback(res);
            }
          })
        }else{
          console.log('用户未授权');
        }
      }
    })
  },
  globalData: {
    userInfo: {}
  }
})
