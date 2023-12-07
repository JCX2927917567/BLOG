const db = require("../base")

// 查询用户
db.query('SELECT * FROM user', (err, results, fields) => {
    console.log('Executing query...');
    if (err) {
        console.error('Database query error:', err);
        return;
    }
    console.log('Query results:', results);
    console.log('Fields:', fields);
});