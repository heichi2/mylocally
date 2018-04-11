module.exports = (url,data) =>{
    return new Promise((resolve,reject)=>{
        wx.request({
            url: `https://locally.uieee.com/${url}`,
            data:data,
            success: resolve,
            fail: reject
        });
    });
}
// module.exports导出一个箭头函数，函数返回一个promise对象