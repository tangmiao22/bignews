$(function () {

  var layer = layui.layer
  var form = layui.form


  //获取文章分类列表
  initArtCateList()
  function initArtCateList() {
    $.ajax({
      method:'get',
      url:'/my/article/cates',
      success:function (res) {
       var htmlStr = template('tpl-table',res)
        $('tbody').html(htmlStr)
      }
    })
  }

  // 为添加按钮绑定点击事件
  var indexAdd = null

  $('#btnAddCate').click(function () {
   indexAdd = layer.open({
      type:1,
      area: ['500px', '250px'],
      title: '添加文章分类',
      content: $('#dialog-add').html()
    })
  })


  //通过代理的形式，为form-add 绑定提交事件
  $('body').on('submit','#form-add',function (e) {
   e.preventDefault()
  $.ajax({
    method:'post',
    url:'/my/article/addcates',
    data:$(this).serialize(),
    success:function (res) {
      if (res.status!==0) {
        return layer.msg('新增分类失败！')
      }
      initArtCateList()
      layer.msg('新增分类成功！')
      //根据索引关闭弹出层
      layer.close(indexAdd)
    }
  })
  })

  //通过代理的形式，为btn-edit按钮绑定点击事件
  var indexEdit = null
  $('tbody').on('click','.btn-edit',function () {
   // 弹出一个修改文章分类的信息层
    indexEdit=  layer.open({
      type:1,
      area: ['500px', '250px'],
      title: '修改文章分类',
      content: $('#dialog-edit').html()
    })

    var id = $(this).attr('data-id')
    // console.log(id)
    //f发起请求获取对应分类的数据
    $.ajax({
      type:'get',
      url:'/my/article/cates/' +id,
      success:function (res) {
        form.val('form-edit',res.data)
      }
    })
  })


  //通过代理的形式，为修改分类的表单绑定submit事件
  $('body').on('submit','#form-edit',function (e) {
    e.preventDefault()
    $.ajax({
      type:'post',
      url:'/my/article/updatecate',
      data:$(this).serialize(),
      success:function (res) {
        if (res.status!==0) {
          return layer.msg('更新分类数据失败')
        }
        layer.msg('更新分类数据成功')
        layer.close(indexEdit)
        initArtCateList()
      }
    })
  })




  //通过代理的形式，为删除按钮绑定点击事件
  $('body').on('click','.btn-delete',function () {
var id = $(this).attr('data-id')
    //提示用户是否要删除
    layer.confirm('确认删除？', {icon: 3, title:'提示'}, function(index){
     $.ajax({
       type:'get',
       url:'/my/article/deletecate/' +id,
       success:function (res) {
         if (res.status!==0) {
           return layer.msg('删除分类数据失败')
         }
         layer.msg('更新分类数据成功')
         layer.close(index);
         initArtCateList()
       }
     })


    });
  })
})