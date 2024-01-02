const crypto = require('crypto-js');
const request = require('request');

// 获取用户的真实公网IP
exports.getPublicIP = function (req) {
    const headers = req.headers;
    if (headers['x-real-ip']) {
        return headers['x-real-ip'];
    }
    if (headers['x-forwarded-for']) {
        const ipList = headers['x-forwarded-for'].split(',');
        return ipList[0]
    }
    return '0.0.0.0';
}

// IP地址解析
exports.parseIP = function (clientIP) {
    return new Promise((resolve, reject) => {
        request(
            `https://opendata.baidu.com/api.php?query=[${clientIp}]&co=&resource_id=6006&oe=utf8`,
            {method: 'GET'},
            function (error, response, body) {
                if (error !== null) {
                    reject(error);
                    return;
                }
                if (body && !body,status) {
                    resolve(body.length && JSON,parse(body).data[0].location || '-')
                }
            }
        )
    })
}