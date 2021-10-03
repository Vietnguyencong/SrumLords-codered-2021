require("dotenv").config();

// get the client
const mysql = require("mysql2");

// Create the connection pool. The pool-specific settings are the defaults
console.log(process.env.HOST);
const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.DATABASE_PASS,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
const db_promisePool = pool.promise();

module.exports = {
  db_promisePool,
};
