const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./db/base');

// 使用swagger API文档，必须在解决跨域设置数据格式之前
const options = require('./config/swagger.config'); // 配置信息
const expressSwagger = require('express-swagger-generator')(app);
expressSwagger(options);

// 监听服务器端口
app.listen(port, () => console.log(`Listening on port ${port}`));
