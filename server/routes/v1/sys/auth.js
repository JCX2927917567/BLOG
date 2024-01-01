/**
 *@author Crystal
 *@date 2023/12/29
 *@Description:后台相关的接口
 */

const express = require('express');
const router = express.Router();
const AuthController = require('@controllers/v1/sys/AuthController');

/**
 * 登录
 */
router.post('/login', AuthController.login);

module.exports = router;
