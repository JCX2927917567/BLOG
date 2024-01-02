/**
 *@author Crystal
 *@date 2023/12/29
 *@Description:后台相关的接口
 */

const express = require('express');
const router = express.Router();
const AuthController = require('@controllers/v1/sys/AuthController');

/**
 * @api {get} /v1/sys/auth/captcha 获取验证码
 * @apiName GetCaptcha
 * @apiGroup system
 *
 * @apiSuccess {Number} status 状态码 (1表示成功).
 * @apiSuccess {String} msg 返回消息 ("成功." 表示成功).
 * @apiSuccess {Number} time 响应时间戳.
 * @apiSuccess {String} data 包含SVG格式的验证码图片数据.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": 1,
 *       "msg": "成功.",
 *       "time": 1704184642435,
 *       "data": "<svg>........</svg>"
 *      }
 */
router.get('/captcha', AuthController.captcha);


/**
 * 登录
 */
// router.post('/login', AuthController.login);

/**
 * 
 * @api {post} /v1/sys/auth/register 用户注册
 * @apiName register
 * @apiGroup system
 * 
 * 
 * @apiParam  {String} email 邮箱
 * @apiParam  {String} password 密码
 * @apiParam  {String} username 昵称
 * 
 * @apiSuccess {Number} status 状态码 (1表示成功).
 * @apiSuccess {String} msg 返回消息 ("成功." 表示成功).
 * @apiSuccess {Number} time 响应时间戳.
 * @apiSuccess {String} data 响应数据.
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": 1,
 *       "msg": "成功.",
 *       "time": 1704184642435,
 *       "data": "{...}"
 *      }
 * 
 * 
 */
router.post('/register', AuthController.register);

module.exports = router;
