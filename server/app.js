require("./alias"); // 引入路径别名配置文件

const express = require('express');
const path = require('path');
const chalk = require('chalk');
const logger = require('morgan');
const app = express();
const isDev = process.env.NODE_ENV === 'development'

// 访问不同的 .env文件，在其他引用环境变量文件前引入，确保其他文件使用环境变量配置时，已经加载
require('dotenv').config({ path: isDev ? './.env.development' : './.env,production' });

// 数据库连接
require('./db/base');

// 使用swagger API文档，必须在解决跨域设置数据格式之前
const options = require('./config/swagger.config'); // 配置信息
const expressSwagger = require('express-swagger-generator')(app);
expressSwagger(options);

// 根据环境打印对应信息
if (isDev) {
    console.log(chalk.bold.yellow('当前是开发环境'));
    app.use(logger('dev'))
} else {
    console.log(chalk.bold.yellow('当前是生产环境'));
}

// 监听服务器端口
app.listen(process.env.PORT, () => {
    /* 开启定时任务 */
    // scheduler.start();

    console.log(
        chalk.hex('#8e44ad').bold(`
      .-----------------.  .----------------.  .----------------.  .----------------.  .----------------.  .----------------.  .----------------. 
      | .--------------. || .--------------. || .--------------. || .--------------. || .--------------. || .--------------. || .--------------. |
      | |  ____  ____  | || |     _____    | || |     ______   | || |    ___       | || |      __      | || |   ______     | || |     _____    | |
      | | |_  _||_  _| | || |    |_   _|   | || |   .' ___  |  | || |  .' _ '.     | || |     /  \\     | || |  |_   __ \\   | || |    |_   _|   | |
      | |   \\ \\  / /   | || |      | |     | || |  / .'   \\_|  | || |  | (_) '___  | || |    / /\\ \\    | || |    | |__) |  | || |      | |     | |
      | |    > \`' <    | || |   _  | |     | || |  | |         | || |  .\`___'/ _/  | || |   / ____ \\   | || |    |  ___/   | || |      | |     | |
      | |  _/ /'\\ \\_   | || |  | |_' |     | || |  \\ \`.___.'\\  | || | | (___)  \\_  | || | _/ /    \\ \\_ | || |   _| |_      | || |     _| |_    | |
      | | |____||____| | || |  \`.___.'     | || |   \`.____.'   | || |  \`.___.'\\__| | || ||____|  |____|| || |  |_____|     | || |    |_____|   | |
      | |              | || |              | || |              | || |              | || |              | || |              | || |              | |
      | '--------------' || '--------------' || '--------------' || '--------------' || '--------------' || '--------------' || '--------------' |
       '----------------'  '----------------'  '----------------'  '----------------'  '----------------'  '----------------'  '----------------' 
      `),
      );
      
    console.log(chalk.bold.green(`项目启动成功: ${process.env.URL}:${process.env.PORT}/v1`));
    console.log(chalk.bold.green(`接口文档地址: ${process.env.URL}:${process.env.PORT}/swagger`));
});

module.exports = app;
