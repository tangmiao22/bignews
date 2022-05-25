$(function () {
  //调用getUserInfo获取用户基本信息

getUserInfo()


  var layer = layui.layer



  $('#btnLogout').on('click',function () {
    //提示用户是否退出
    layer.confirm('确定退出登录', {icon: 3, title:'提示'}, function(index){

     //清空本地存储中的token
      localStorage.removeItem('token')
      //重新跳转到登录页面
      location.href = 'http://localhost:63342/bignews/login.html?_ijt=oot32gl996gbkgcdsr5j3btbn2'
      layer.close(index);
  })

  })
  

})
//获取用户的基本信息
function getUserInfo() {
  $.ajax({
    method:'get',
    url:'/my/userinfo',
    // headers请求配置对象
    // headers:{
    //   Authorization:localStorage.getItem('token')||''
    // // },
    success:function (res) {
      console.log(res)
     if (res.status!==0) {
       return layui.layer.msg('获取用户信息失败')
     }
     //调用renderAvatar 函数，渲染用户头像
      renderAvatar(res.data)
    }
    // 不论成功还是失败，最终都会调用这个complete回调函数
    // complete:function (res) {
    // // console.log(res)
    //   //在complete回调函数中，可以使用responseJSON拿到服务器响应回来的数据
    //   if (res.responseJSON.status===1&&res.responseJSON.message==='身份认证失败！') {
    //     //强制清空token
    //     localStorage.removeItem('token')
    //     //跳转到登录页面
    //     location.href = 'http://localhost:63342/bignews/login.html?_ijt=oot32gl996gbkgcdsr5j3btbn2'
    //
    //   }
    // }
  })
}
//渲染用户信息的头像
function renderAvatar(user) {
  //获取用户昵称
var name = user.nickname ||user.username
  //设置欢迎的文本
  $('#welcome').html('欢迎&nbsp;&nbsp;'+ name)
  //按需渲染用户的头像
  if (user.user_pic!==null) {
    $('.layui-nav-img').attr('src',user.user_pic).show()
    $('.text-avatar').hide()
  } else {
  $('.layui-nav-img').hide()
    var first = name[0].toUpperCase()
  $('.text-avatar').html(first).show()
  }
}