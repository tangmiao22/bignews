$(function () {
  // 点击去注册账号的链接
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()

  })
  //点击去登录的链接
  $('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()

  })
  // 从layui中获取form对象
  var form = layui.form
  var layer = layui.layer
  //通过form.verify()函数自定义校验规则
  form.verify({
    //自定义了一个pwd的校验规则
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    // 校验两次密码是否一致的规则
    repwd: function (value) {
      //通过形参拿到的是确认密码框中的内容，还需要拿到尼玛框中的内容，然后进行等于判断
      var pwd = $('#mima').val()
      if (pwd !== value) {
        return '两次密码不一致哦！'
      }
    }
  })
  //监听注册表单的提交事件
  $('#form_reg').on('submit', function (e) {
    e.preventDefault()
    $.post('http://www.liulongbin.top:3007/api/reguser',
      {username: $('#yonghuming').val(), password: $('#mima').val()},
      function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message, {icon: 6})
        }

        layer.msg('注册成功，请登录', {icon: 6})
        //模拟人的点击行为
        $('#link_login').click()
      })


  })
//监听登录表单的提交事件
  $('#form_login').submit(function (e) {
    e.preventDefault()
    $.ajax({
      url: '/api/login',
      method: 'post',
      //快速获取表单中的数据
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('登录失败', {icon: 6})
        }
        layer.msg('登录成功', {icon: 6})
        //将登录成功得到的token字符串，保存到localstorage中
        localStorage.setItem('token', res.token)
        // console.log(res.token)
        //跳转到后台主页
        location.href = 'http://localhost:63342/bignews/index.html?_ijt=mn72te20qdosgh3g8rr4noodp6'
      }
    })
  })
})