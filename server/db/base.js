const mysql = require('mysql2/promise');
const config = require('../config/db.config');
const chalk = require('chalk');

const pool = mysql.createPool({
  host: config.DB_HOST,
  port: 3306,
  user: 'blog',
  password: 'E8DBjE5szZhxJxaw',
  database: 'blog',
  charset: 'utf8mb4', // 字符集配置
  waitForConnections: true,
  connectionLimit: 5, // 连接池允许的最大连接数
  queueLimit: 0, // 请求队列的最大长度，0 表示无限制
  acquireTimeout: 10000, // 获取连接的最大等待时间（毫秒）
  idleTimeout: 60000, // 连接空闲的超时时间（毫秒）
});

pool.getConnection()
  .then((connection) => {
    let isDev = process.env.NODE_ENV === 'development';
    console.log(chalk.rgb(123, 45, 67).bold(`连接${isDev ? chalk.blue.bold('开发环境') : chalk.blue.bold('生产环境')}数据库成功：` + chalk.hex('#DEADED').underline(connection.config.database)));
    connection.release();
  })
  .catch((error) => {
    console.error('Error in MySQL connection: ' + error.message);
    process.exit(1);
  });

process.on('beforeExit', () => {
  pool.end();
});

module.exports = pool;
