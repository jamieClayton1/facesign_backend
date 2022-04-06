const { Pool, Client } = require('pg');
require('dotenv/config');

/* Database config */
const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
});

/* Export async database query */
module.exports =  {
    query: async (text, params, callback) => {
      return await pool.query(text, params, callback)
    },
};