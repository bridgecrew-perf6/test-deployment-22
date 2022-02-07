const Pool = require('pg').Pool;

// connect to my database
const pool = new Pool({
    user: 'postgres',
    password: 'b2mmeyssa',
    host: 'localhost',
    port: 5432,
    database: 'perntodo'
})


module.exports = pool;