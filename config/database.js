const { createPool } = require("mysql");

const pool = createPool({
  host: "sql6.freesqldatabase.com",
  port: 3306,
  user: "sql6515845",
  password: "AhKgNPTRsf",
  database: "sql6515845",
  connectionLimit: 10
});

module.exports = pool;