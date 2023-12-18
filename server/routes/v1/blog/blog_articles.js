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
 * 
 * /**
 * @apiParam {Object} params 查询参数
 * @apiParam {Object} params.pagination 分页信息
 * @apiParam {Number} params.pagination.current 当前页码
 * @apiParam {Number} params.pagination.pageSize 页面大小
 * @apiParam {Object} params.sort 排序信息
 * @apiParam {String} params.sort.columnKey 列名
 * @apiParam {String} params.sort.order 排序方式 (ascend/descend)
 *
 * @apiSuccess {Object} data 返回的数据
 * @apiSuccess {Array} data.blogList 博文列表
 * @apiSuccess {Object} data.pagination 分页信息
 * @apiSuccess {Number} data.pagination.current 当前页码
 * @apiSuccess {Number} data.pagination.pageSize 页面大小
 * @apiSuccess {Number} data.pagination.total 总记录数
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "data": {
 *        "blogList": [...], // 博文列表
 *        "pagination": {
 *          "current": 1, // 当前页码
 *          "pageSize": 10, // 页面大小
 *          "total": 100 // 总记录数
 *        }
 *      }
 *    }
 *
 * @apiError {Object} error 错误信息
 * @apiError {String} error.message 错误描述
 * @apiError {Number} error.code 错误代码
 *
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "error": {
 *        "message": "Internal Server Error",
 *        "code": 500
 *      }
 *    }
 */
router.post('/list', Blog_articlesController.blog_articleslist);

module.exports = router;