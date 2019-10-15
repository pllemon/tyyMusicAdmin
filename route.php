<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006~2018 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

use think\Route;

/**============小程序 ================*/
// 用户
Route::rule('register', 'api/Login/register'); //用户注册
Route::rule('resetpwd', 'api/Login/resetpwd'); //用户重置密码
Route::rule('login', 'api/Login/login');  //用户登录
Route::rule('userinfo', 'api/User/userinfo');  //用户登录
Route::rule('userorderlist', 'api/User/userorderlist'); //用户订单列表
Route::rule('feedback', 'api/User/feedback'); //用户反馈
Route::rule('userintegrallist', 'api/User/userintegrallist'); //用户积分列表

//用户订单信息
Route::rule('markorder', 'api/Order/markorder');  //创建订单
Route::rule('orderinfo', 'api/Order/orderinfo'); //用户订单详情
Route::rule('graborderlist', 'api/Order/graborderlist'); //可报名订单列表
Route::rule('craftsmanlist', 'api/Order/craftsmanlist'); //师傅报名列表
Route::rule('choosecraftsman', 'api/Order/choosecraftsman'); //选择师傅
Route::rule('uploadordersimg', 'api/Uploadimg/uploadordersimg'); //订单上传图片
Route::rule('usercomment', 'api/Order/usercomment'); //用户评价

//用户到商家消费使用积分
Route::rule('useruseintegral', 'api/User/useruseintegral'); //用户评价


//订单支付操作
Route::rule('payearnestprice', 'api/Orderpay/payearnestprice'); //用户支付定金
Route::rule('paytailprice', 'api/Orderpay/paytailprice'); //用户支付尾款

//服务类目
Route::rule('getconfig', 'api/Index/getconfig');  //用户登录 get参数 pid  id
Route::rule('getdoc', 'api/Index/getdoc'); //获取单个协议

//获取网点信息
Route::rule('networklist', 'api/Index/networklist'); //获取网点列表

//用户工程秀
Route::rule('ordershowlist', 'api/Index/ordershowlist'); //小程序用显示工匠秀列表
Route::rule('ordershowinfo', 'api/Index/ordershowinfo'); //小程序用显示工匠秀详情

//商家
Route::rule('applybusiness', 'api/Tobusiness/applybusiness'); //申请成为商家
Route::rule('uploadobusinessimg', 'api/Uploadimg/uploadobusinessimg'); //上传商家图片
Route::rule('businesslist', 'api/Tobusiness/businesslist'); //商家列表
Route::rule('businessorderlist', 'api/Business/orderlist'); //商家订单列表
Route::rule('businessorderinfo', 'api/Business/orderinfo'); //商家订单详情
Route::rule('buscomorder', 'api/Business/buscomorder'); //商家确认订单
Route::rule('businessancelorder', 'api/Business/cancelorder'); //商家取消订单
Route::rule('businessorcode', 'api/Business/orcode'); //商家二维码

//工匠
Route::rule('applycraftsman', 'api/Tocraftsman/applycraftsman'); //申请成为工匠
Route::rule('craftsmanorderlist', 'api/Craftsman/craftsmanorderlist'); //订单列表
Route::rule('craftsmansignup', 'api/Craftsman/craftsmansignup'); //工匠报名
Route::rule('craftsmanconfirmorder', 'api/Craftsman/craftsmanconfirmorder'); //师傅确认完工
Route::rule('craftsmanshow', 'api/Craftsman/craftsmanshow'); //工程秀内容
Route::rule('craftsmanshowlist', 'api/Craftsman/craftsmanshowlist'); //工程秀列表
Route::rule('uploadordershow', 'api/Uploadimg/uploadordershow'); //上传工程秀图片
Route::rule('savecraftsmanshow', 'api/Craftsman/savecraftsmanshow'); //修改工程秀
Route::rule('craftsmanshowinfo', 'api/Craftsman/craftsmanshowinfo'); //师傅显示自己工程秀详情

//广告图
Route::rule('bannerlist', 'api/Index/bannerlist'); 

/**============ 后台管理系统 ================*/
//小程序用户订单
Route::rule('admin/orderlist', 'admin/Userorder/orderlist'); //订单列表
Route::rule('admin/orderinfo', 'admin/Userorder/orderinfo'); //订单详情
Route::rule('admin/orderexamine', 'admin/Userorder/orderexamine'); //订单审核
Route::rule('admin/ordersrelease', 'admin/Userorder/ordersrelease'); //订单发布
Route::rule('admin/uploadordersimg', 'admin/Uploadimg/uploadordersimg'); //订单审核上传图片
Route::rule('admin/ordercraftsmanlist', 'admin/Userorder/ordercraftsmanlist'); //报名师傅列表
Route::rule('admin/choosecraftsman', 'admin/Userorder/choosecraftsman'); //选择师傅
//小程序用户信息
Route::rule('admin/userlist', 'admin/User/userlist'); //用户列表
Route::rule('admin/feedback', 'admin/User/feedback'); //用户反馈

//登录
Route::rule('admin/login', 'admin/Login/login'); //登录

//后台用户信息
Route::rule('admin/adminuserinfo', 'admin/Adminuser/adminuserinfo'); //后台用户信息

//师傅
Route::rule('admin/craftsmanlist', 'admin/Craftsman/craftsmanlist'); //师傅列表
Route::rule('admin/craftsmanorderlist', 'admin/Craftsman/orderlist'); //师傅订单列表
Route::rule('admin/craftsmaninfo', 'admin/Craftsman/craftsmaninfo'); //师傅详情
Route::rule('admin/craftsmanexamine', 'admin/Craftsman/craftsmanexamine'); //审核师傅
Route::rule('admin/uploadcraftsmanimg', 'admin/Uploadimg/uploadcraftsmanimg'); //审核师傅上传图片
Route::rule('admin/craftsmansettlementlist', 'admin/Craftsman/settlementlist'); //师傅结算列表
Route::rule('admin/craftsmansettlement', 'admin/Craftsman/settlement'); //师傅结算操作

//商家列表
Route::rule('admin/businesslist', 'admin/Business/businesslist'); //商家列表
Route::rule('admin/businessexamine', 'admin/Business/businessexamine'); //商家审核 
Route::rule('admin/businessinfo', 'admin/Business/businessinfo'); //商家详情
Route::rule('admin/businessorderlist', 'admin/Business/orderlist'); //商家订单列表
Route::rule('admin/businessorderinfo', 'admin/Business/orderinfo'); //商家订单详情

//服务协议等
Route::rule('admin/setdoc', 'admin/Docconfig/setdoc'); //添加修改各种协议
Route::rule('admin/getdoc', 'admin/Docconfig/getdoc'); //获取单个协议

//广告图
Route::rule('admin/bannerlist', 'admin/Banner/bannerlist'); //广告图列表
Route::rule('admin/bannerinfo', 'admin/Banner/bannerinfo');
Route::rule('admin/addbanner', 'admin/Banner/addbanner'); //添加广告图
Route::rule('admin/updatebannerstatus', 'admin/Banner/updatebannerstatus'); //修改广告图状态
Route::rule('admin/updatebannerinfo', 'admin/Banner/updatebannerinfo'); //修改广告图详细信息

//工匠秀
Route::rule('admin/showlist', 'admin/Ordershow/showlist'); //工匠秀列表
Route::rule('admin/showinfo', 'admin/Ordershow/showinfo'); //工匠秀详情
Route::rule('admin/addshow', 'admin/Ordershow/addshow'); //添加工匠秀
Route::rule('admin/saveshow', 'admin/Ordershow/saveshow'); //编辑工匠秀
Route::rule('admin/uploadordershow', 'admin/Uploadimg/uploadordershow'); //添加工匠秀图片

//网点
Route::rule('admin/networklist', 'admin/Network/networklist'); //网点列表
Route::rule('admin/networkinfo', 'admin/Network/networkinfo'); //网点详情
Route::rule('admin/addnetwork', 'admin/Network/addnetwork'); //添加网点
Route::rule('admin/updatenetwork', 'admin/Network/updatenetwork'); //修改网点(状态)



//1014
admin/saveadminuser 修改后台用户信息 post.network_id post.phone,role，remark，password（password需要改密码的时候传过来 要不然传个空值）
admin/saveadminstatus 修改后台用户状态 post.admin_id post.status 1 开启2禁用3删除

businessorderlist 没有分页
线下状态改为 4种，待商家确认（type=confirm）、已完成(type=success)、已取消(type = cancel)

savebusinessdstatus   status = 1 || 4 更改商家状态

admin/savecraftsmanstatus 修改师傅状态 post.craftsman_id

admin/addadminuser 新增后台用户 post.username post.password，post.role,post.network_id
admin/adminlist 后台用户信息列表
admin/adminuserinfo 后台用户信息 get.admin_id

admin/saveadminstatus 修改后台用户状态 post.admin_id post.status 1 开启2禁用3删除

admin/saveadminuser 修改后台用户信息 post.network_id post.phone,role，remark，password（password需要改密码的时候传过来 要不然传个空值）


businesscashin //商家申请提现 post.cashinmoney
busiintegrallist 这个接口

businesscashinlist//商家提现列表 1申请中，2驳回3取消4通过
admin/businesscashinlist 后台商家提现列表

admin/savcashinstatus //修改商家提现状态
status 状态，bcl_id 列表的id，remark 操作描述