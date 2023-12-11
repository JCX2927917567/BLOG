/*
* TODO:- mysql数据库基本配置导出
* */

console.log('DB_HOST from environment variables:', process.env.DB_HOST);


module.exports = {
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DATABASE: process.env.DB_DATABASE
}
