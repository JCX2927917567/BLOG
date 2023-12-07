const MySql = require('mysql2');

const db = MySql.createPool({
    host: '47.99.34.53',
    user: 'blog',
    password: 'E8DBjE5szZhxJxaw',
    database: 'blog',
    charset: 'utf8mb4',
    pool: {
        max: 5,
        min: 0,
        idle: 10000,
        acquireTimeout: 10000,
        idleTimeout: 60000
    }
}, (err) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Database connected successfully!');
    }
});

