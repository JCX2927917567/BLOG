const { Blog_articlesModel } = require('@models/v1')
const tokenAuthentication = require('@middlewares/tokenAuthentication')
const apiResponse = require('@utils/utils.apiResponse')

/**
 * 权限：
 * 'blog:blog_articles:list'
 * 'blog:blog_articles:create'
 * 'blog:blog_articles:update'
 * 'blog:blog_articles:delete'
 */

exports.blog_articleslist = [
    tokenAuthentication,
    // actionRecords({module: '博文管理/查询'}),
    // async (req, res, next) => {
    //     try {
    //         let query = req.body;
    //         // 如果 query.params 为空，则设置一个空对象作为默认值
    //         let params = query.params || {};
    //         let current = Number(query.pagination?.current || 1) || 1;
    //         let pageSize = Number(query.pagination?.pageSize || 15) || 15;
    //         // 修改排序参数
    //         let sortColumn = query.sort?.columnKey || 'createdAt'; // 默认排序字段为 'id'
    //         let sortOrder = query.sort?.order === 'ascend' ? 1 : -1; // 根据排序顺序确定排序方式 1 升序 -1降序（descend：大-小）
    //         // 对 params 的每个属性值进行模糊匹配
    //         let fuzzyParams = {};
    //         for (let key in params) {
    //             if (params.hasOwnProperty(key)) {
    //                 if (params[key]) {
    //                     fuzzyParams[key] = {$regex: new RegExp(params[key], 'i')};
    //                 } else {
    //                     delete fuzzyParams[key]; //删除空属性
    //                 }
    //             }
    //         }

    //         let aggregationPipeline = [
    //             // 使用提供的查询参数进行文档筛选
    //             {$match: fuzzyParams},
    //             {
    //                 $lookup: {
    //                     from: 'users', // 用户表的名称
    //                     localField: 'userId',
    //                     foreignField: '_id',
    //                     as: 'user'
    //                 }
    //             },
    //             {$sort: {[sortColumn]: sortOrder}},
    //             {$skip: (current - 1) * pageSize},
    //             {$limit: pageSize}
    //         ];

    //         // 添加筛选条件
    //         // 判断 params.status 是否为 true 或 false，设置 fuzzyParams.status
    //         if (params.hasOwnProperty('status') && (params.status === true || params.status === false)) {
    //             fuzzyParams.status = params.status;
    //         }
    //         // 判断 params.isReship 是否为 true 或 false，设置 fuzzyParams.isReship
    //         if (params.hasOwnProperty('isReship') && (params.isReship === true || params.isReship === false)) {
    //             fuzzyParams.isReship = params.isReship;
    //         }

    //         // 判断 params.recommended 是否为 true 或 false，设置 fuzzyParams.recommended
    //         if (params.hasOwnProperty('recommended') && (params.recommended === true || params.recommended === false)) {
    //             fuzzyParams.recommended = params.recommended;
    //         }
    //         let [result, total] = await Promise.all([
    //             // 执行聚合查询获取结果数据
    //             Blog_articlesModel.aggregate(aggregationPipeline),
    //             // 计算满足查询条件的文档总数
    //             Blog_articlesModel.countDocuments(query.params)
    //         ]);

    //         return apiResponse.successResponseWithData(res, "Success.", result.length > 0 ? {
    //             result,
    //             current,
    //             pageSize,
    //             total
    //         } : {result: [], total});
    //     } catch (err) {
    //         next(err);
    //     }
    // }
]



