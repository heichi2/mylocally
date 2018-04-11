// pages/list/list.js
const fetch=require('../../utils/fetch.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //   列表分类的标题
    category:{},
    // 列表商铺
    shops:[],
    hasmore:true,
    pageIndex:0,
    pageSize:10,
    inputText:''
  },
//   加载下一页列表
  loadMore() {
      if (!this.data.hasmore) return; 
    //   结构赋值
    let {pageIndex,pageSize}=this.data;
      let params = { _page: ++pageIndex, _limit: pageSize };
    return  fetch(`categories/${this.data.category.id}/shops`,params).then(res => {
          const shops = this.data.shops.concat(res.data);
          const count = parseInt(res.header['X-Total-Count']);
          const hasmore= pageIndex*pageSize<count;
          this.setData({
              shops,
              pageIndex,
              hasmore
          });
      })
  },
// 搜索框输入
inputHandle:function(e){
setTimeout(()=>{
    this.setData({
        shops: [],
        hasmore: true,
        pageIndex: 0
    });
    let { pageIndex, pageSize } = this.data;
    let inputText = e.detail.value;
    let params = { _page: ++pageIndex, _limit: pageSize, q: inputText };
    fetch(`categories/${this.data.category.id}/shops`, params).then(res => {
        const shops = res.data;
        const count = res.data.length;
        const hasmore = pageIndex * pageSize < count;
        this.setData({
            shops,
            pageIndex,
            hasmore
        });
    })
},500);

},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //   页面加载并不一定比页面初次渲染先执行
      fetch(`categories/${options.cat}`).then(res=>{
          this.setData({
              category:{name:res.data.name,id:options.cat}
          });
        //   设置导航条标题
          wx.setNavigationBarTitle({
              title: res.data.name
          });
        // 获取列表数据
        this.loadMore();
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if(this.data.category.name){
        wx.setNavigationBarTitle({
            title: this.data.category.name
        });
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    //   下拉刷新重新加载页面
      this.setData({
          shops: [],
          hasmore: true,
          pageIndex: 0
      });
      this.loadMore().then(()=>{wx.stopPullDownRefresh();});
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('到底了');
    this.loadMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})