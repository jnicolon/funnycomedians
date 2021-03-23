require("dotenv").config();
const Pool = require("pg").Pool;


const connectionString = process.env.DATABASE_URL

const pool = new Pool({
  connectionString,
    ssl: {
    rejectUnauthorized: false,
  }
})

// const pool = new Pool({
//   user: process.env.SQL_USERNAME,
//   host: process.env.SQL_HOST,
//   database: process.env.SQL_DATABASE,
//   password: process.env.SQL_PASSWORD,
//   port: process.env.SQL_PORT,
//   ssl: {
//     rejectUnauthorized: false,
//   }
// });

module.exports = pool