/**
 *@author Crystal
 *@date 2023/12/16 14:51
 *@status: 1 操作成功 0 操作失败
 * TODO http status:
 *  200 正常响应
 *  400 参数校验失败
 *  404 接口不存在
 *  401 未授权 ：token身份认证未通过
 *  403 用户权限不足 ：没有访问特定资源的权限 菜单权限等用户的权限相关验证未通过
 *  500 服务器内部错误
 */

// 成功响应
exports.successResonse = function (res, msg) {
    let data = {
        status: 1,
        msg: msg,
        time: Date.now()
    }
    return res.status(200).json(data)
}

// 成功响应携带数据
exports.successResonseWithData = function (res, msg, data) {
    let result = {
        status: 1,
        msg: msg,
        time: Date.now(),
        data: data
    }
    return res.status(200).json(result)
}

// 服务器内部错误
exports.ErrorResponse = function (res, msg) {
    let data = {
        status: 0,
        msg: msg,
        time: Date.now()
    }
    return res.status(500).json(data)
}

// 接口不存在
exports.notFoundResponse = function (res, msg) {
    let data = {
        status: 0,
        msg: msg,
        time: Date.now()
    }
    return res.status(404).json(data)
}

// 参数校验失败, 客户端发送错误请求
exports.validationErrorWithData = function (res, msg, data) {
    let result = {
        status: 0,
        msg: msg,
        time: Date.now(),
        data: data
    }
    return res.status(400).json(result)
}

// token 未授权或已过期错误响应
exports.unauthorizedResponse = function (res, msg) {
    let data = {
        status: 0,
        msg: msg,
        time: Date.now()
    }
    return res.status(401).json(data)
}

// 用户权限不足 响应
exports.forbiddenResponse = function (res, msg) {
    let data = {
        status: 0,
        msg: msg || 'Forbidden',
        time: Date.now()
    }
    return res.status(403).json(data)
}