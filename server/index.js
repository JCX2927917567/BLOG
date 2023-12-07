const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./db/base');

// 通用中间件

// 监听服务器端口
app.listen(port, () => console.log(`Listening on port ${port}`));
