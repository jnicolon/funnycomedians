const fs = require("fs");
require("dotenv").config();

const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.SQL_USERNAME,
  host: process.env.SQL_HOST,
  database: process.env.SQL_DATABASE,
  password: process.env.SQL_PASSWORD,
  port: process.env.SQL_PORT,
});

const uploadComedians = async (comedians) => {

      comedians.forEach(async (comedian) => {
        
        const query = `INSERT INTO grisley_pear(comedian_name, img_sm, img_lg, bio) 
                          VALUES ($1, $2, $3, $4)`;
        pool.query(query, [comedian.name, comedian.imgSm, comedian.imgLg, comedian.bio], (err, results) => {
          if (err) {
            console.log("There was an error: " + err);
          } else {
            console.log(`${comedian.name} uploaded succesfully`);
          }
          
        });
      });
}


module.exports = uploadComedians;
