const jwt = require("jsonwebtoken");
const { body } = require('express-validator');
const apiResponse = require('@utils/utils.apiResponse');
const log = require('@utils/utils.logger')

/**
 * 登录
 */
exports.login = [
    // actionRecords({module: '登录'}),
    (req, res) => {console.log(req)},
    // 参数验证
    [
        body("username").notEmpty().withMessage('用户名不能为空.'),
        body("password").notEmpty().withMessage('密码不能为空.'),
        body("code").notEmpty().withMessage('验证码不能为空.'),
    ],

    async (req, res) => {
        try {
            const result = validationResult(req);
            if (!result.isEmpty()) {
                return apiResponse.validationErrorWithData(res, errors.array()[0].msg);
            } else {
                if (!req.session.code) return apiResponse.validationErrorWithData(res, "验证码已失效");
                if (req.session.code != req.body.code) return apiResponse.validationErrorWithData(res, "验证码错误");
                const userWithDate = await UsersModel.findOne({username: req.body.username}) 
                if (!userWithDate) return apiResponse.validationErrorWithData(res, "用户名不存在");
                // 密码与数据库进行比对
                let isPass = await decryption(req.body.password, userWithDate.password);
                if (!isPass) return apiResponse.validationErrorWithData(res, "用户名或密码错误");
                // if (!userWithDate.status) return apiResponse.unauthorizedResponse(res, "当前账户无权限");

                // 响应给前端的数据
                let userData = {
                    userid: userWithDate.user_id,
                    username: userWithDate.user_name,
                    nickname: userWithDate.user_nickname,
                    email: userWithDate.user_email,
                    profile_photo: userWithDate.user_profile_photo,
                    registration_time: userWithDate.user_registration_time,
                    birthday: userWithDate.user_birdthday,
                    phone: userWithDate.user_phone,
                    age: userWithDate.user_age
                };
                userData.token = 'Bearer ' + jwt.sign(
                    userData,
                    process.env.SIGN_KEY,
                    {
                        expiresIn: 3600 * 24 * 3
                    }
                )
                log.info(`*** 昵称: ${userWithData.nickname} 登录成功`)
                return apiResponse.successResponseWithData(res, "登录成功.", userData);
            }
        } catch {
            console.log(err);
            log.error(`*** ${req.body.username} 登录失败 ** 错误信息 : ${JSON.stringify(err)}`)
            return apiResponse.ErrorResponse(res, err);
        }
    }

]