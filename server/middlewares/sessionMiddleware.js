/**
 *@author Crystal
 *@date 2023/12/14
 *@Description:session中间件
 * TODO:使用：eg:存储验证码 req.sessionMiddleware.code = 123  过了有效期 req.sessionMiddleware.code=null
 */

 const sessionMiddleware = require('express-session')
 const sessionAuth = sessionMiddleware({
     secret: "XJCApi",	// 对cookie进行签名
     name: "session",	// cookie名称，默认为connect.sid
     resave: false,	// 强制将会话保存回会话容器
     rolling: false,	// 强制在每个response上设置会话标识符cookie
     saveUninitialized: false, // 设置为false以减少存储占用
     cookie: {
         maxAge: 5 * 60 * 1000 // 5分钟后失效
     }
 });
 module.exports = sessionAuth;
 