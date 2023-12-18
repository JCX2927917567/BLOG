require("./alias"); // 引入路径别名配置文件

const { exec } = require('child_process');
const express = require('express');
const path = require('path');
const chalk = require('chalk');
const logger = require('morgan');
const cors = require('cors');
const mount = require('mount-routes');
const scheduler = require('@/scheduler');
const sessionAuth = require('@/middlewares/sessionMiddleware');
const errorHandler = require('@utils/utils.errorHandler');
const apiResponse = require('@utils/utils.apiResponse');
const isDev = process.env.NODE_ENV === 'development'

// 访问不同的 .env文件，在其他引用环境变量文件前引入，确保其他文件使用环境变量配置时，已经加载
require('dotenv').config({ path: isDev ? './.env.development' : './.env,production' });

// 异步报错无需try-catch捕获
require('express-async-errors');

// 数据库连接
require('@db/base');

// 生成文档,与热更新结合，须在nodemon.json中忽略文档输出文件
exec('npx apidoc -i routes -o apidoc', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing apidoc: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`apidoc encountered an error: ${stderr}`);
      return;
    }
    console.log('apidoc output');
});

const app = express();

// Session全局中间件配置
app.use(sessionAuth);

// Serve static files (apidoc-generated documentation)
app.use('/apidoc', express.static(path.join(__dirname, 'apidoc')));

// 中间件处理post请求参数解析
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 处理跨域
app.use(cors());

// 设置跨域和设置允许的请求头信息
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, token");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Authorization");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With');
    res.header("Content-Type", "application/json;charset=utf-8");
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    }
    else next();
})

// 根据环境打印对应信息
if (isDev) {
    console.log(chalk.bold.yellow('当前是开发环境'));
    app.use(logger('dev'))
} else {
    console.log(chalk.bold.yellow('当前是生产环境'));
}

// 监听SIGINT信号，当应用程序被强制关闭时停止所有定时任务
process.on('SIGINT', () => {
    scheduler.stop();
    process.exit();
});

// 带路径的用法并且可以打印出路由表 true代表展示路由表在打印台
mount(app, path.join(__dirname, 'routes'), isDev);

// 添加全局错误处理中间件
app.use(errorHandler);

// 404错误处理中间件
app.all('*', function (req, res, next) {
    return apiResponse.notFoundResponse(res, '404 --- 接口不存在');
})

// 监听服务器端口
app.listen(process.env.PORT, () => {
    /* 开启定时任务 */
    scheduler.start();

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
    console.log(chalk.bold.green(`接口文档地址: ${process.env.URL}:${process.env.PORT}/apidoc`));
});

module.exports = app;
