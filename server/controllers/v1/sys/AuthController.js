const jwt = require("jsonwebtoken");
const { body, validationResult } = require('express-validator');
const mailer = require('@utils/utils.mailer')
const apiResponse = require('@utils/utils.apiResponse');
const svgCaptcha = require('svg-captcha');
const log = require('@utils/utils.logger');
const {actionRecords} = require("@middlewares/actionLogMiddleware");
const {encryption, parseIP, getPublicIP, getEmailAvatar} = require('@utils/utils.others')

const UAParser = require("ua-parser-js");

/**
 * 生成随机验证码
 */
exports.captcha = [
    async (req, res) => {
        try {
            // 验证码API配置
            let options = {
                // 线条数
                noise: Math.floor(Math.random() * 5),
                color: true,
                fontSize: 55,
                with: 90,
                height: 38
            }
            let captcha = svgCaptcha.createMathExpr(options);
            //存储到session
            req.session.code = captcha.text
            apiResponse.successResonseWithData(res, "成功.", captcha.data);
        } catch (err) {
            console.log(err);
            return apiResponse.ErrorResponse(res, err);
        }        
    }
]

/**
 * 登录
 */
// exports.login = [
//     actionRecords({module: '登录'}),
//     // (req, res) => {console.log(req)},
//     // 参数验证
//     [
//         body("username").notEmpty().withMessage('用户名不能为空.'),
//         body("password").notEmpty().withMessage('密码不能为空.'),
//         body("code").notEmpty().withMessage('验证码不能为空.'),
//     ],

//     async (req, res) => {
//         try {
//             const result = validationResult(req);
//             if (!result.isEmpty()) {
//                 return apiResponse.validationErrorWithData(res, errors.array()[0].msg);
//             } else {
//                 if (!req.session.code) return apiResponse.validationErrorWithData(res, "验证码已失效");
//                 if (req.session.code != req.body.code) return apiResponse.validationErrorWithData(res, "验证码错误");
//                 const userWithDate = await UsersModel.findOne({username: req.body.username}) 
//                 if (!userWithDate) return apiResponse.validationErrorWithData(res, "用户名不存在");
//                 // 密码与数据库进行比对
//                 let isPass = await decryption(req.body.password, userWithDate.password);
//                 if (!isPass) return apiResponse.validationErrorWithData(res, "用户名或密码错误");
//                 // if (!userWithDate.status) return apiResponse.unauthorizedResponse(res, "当前账户无权限");

//                 // 响应给前端的数据
//                 let userData = {
//                     userid: userWithDate.user_id,
//                     username: userWithDate.user_name,
//                     nickname: userWithDate.user_nickname,
//                     email: userWithDate.user_email,
//                     profile_photo: userWithDate.user_profile_photo,
//                     registration_time: userWithDate.user_registration_time,
//                     birthday: userWithDate.user_birdthday,
//                     phone: userWithDate.user_phone,
//                     age: userWithDate.user_age
//                 };
//                 userData.token = 'Bearer ' + jwt.sign(
//                     userData,
//                     process.env.SIGN_KEY,
//                     {
//                         expiresIn: 3600 * 24 * 3
//                     }
//                 )
//                 log.info(`*** 昵称: ${userWithData.nickname} 登录成功`)
//                 return apiResponse.successResponseWithData(res, "登录成功.", userData);
//             }
//         } catch {
//             console.log(err);
//             log.error(`*** ${req.body.username} 登录失败 ** 错误信息 : ${JSON.stringify(err)}`)
//             return apiResponse.ErrorResponse(res, err);
//         }
//     }

// ]

/**
 * 注册
 */
exports.register = [
    // 日志记录
    actionRecords({module: '注册'}),
    // 必填参数验证
    [
        body("nickname").notEmpty().withMessage('昵称不能为空.'),
        body("username").notEmpty().withMessage('用户名不能为空.').custom((value, {req}) => {
            return UsersModel.findOne({username: value}).then(user => {
                if (user) {
                    return Promise.reject(`用户名:${user.username}已经注册,请更换其他.`);
                }
            });
        }),
        body("password").notEmpty().withMessage('密码不能为空.').isLength({min: 6}).trim().withMessage('密码不能小于6位.'),
    ],
    async (req, res) => {
        try {
            const result = validationResult(req);
            if (!result.isEmpty()) {
                return apiResponse.validationErrorWithData(res, result.array()[0].msg);
            } else {
                // 获取用户ip
                const clientIP = getPublicIP(req);
                //识别常见的浏览器、操作系统和设备等信息
                const u = new UAParser(req.headers['user-agent']);
                const address = await parseIP(clientIP);
                const equipment = u.getBrowser().name ? `${u.getBrowser().name}.v${u.getBrowser().major}` : '未知';

                // 密码加密
                let enPassword = await encryption(req.body.password)
                let avatar = await getEmailAvatar(req.body.email)
                // 保存用户
                let newUser = {
                    type: 'admin', // 默认管理端用户
                    avatar: req.body.avatar || avatar,
                    nickname: req.body.nickname,
                    username: req.body.username,
                    password: enPassword,
                    userIp: clientIP,
                    email: req.body.email,
                    address,
                    platform: equipment,
                    roleId: '64a7aa20a971facd04696242',
                };
                const addInfo = await UsersModel.create(newUser)
                if (addInfo) {
                    // 发送邮件
                    addInfo.email && await mailer.send(req.body.email, `恭喜您已注册成功,感谢您的使用XJC·ADMIN！`)
                    log.info(`+++ 新用户: ${req.body.username} 注册成功`)
                    return apiResponse.successResponse(res, "注册成功");
                }
            }
        } catch (err) {
            console.log(err)
            return apiResponse.ErrorResponse(res, err);
        }
    }
]