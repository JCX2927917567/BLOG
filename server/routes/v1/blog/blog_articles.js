/**
 *@author Crystal
 *@date 2023/12/17 0:10
 *@Description:博文管理相关的接口
 */

 const express = require('express');
 const router = express.Router();

 const Blog_articlesController = require('@controllers/v1/blog/Blog_articlesController');

 /***************************************************************************************/

/**
 * @api {post} /v1/blog/blog_articles/list 获取博文管理列表
 * @apiGroup 博文管理
 * @apiDescription 博文管理相关的接口
 */
router.post('/list', Blog_articlesController.blog_articleslist);

module.exports = router;