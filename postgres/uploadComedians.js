const pool = require('./pool')

const uploadComedians = async (comedians, comedyClub) => {

      comedians.forEach(async (comedian) => {
        
        const query = `INSERT INTO ${comedyClub}(comedian_name, img_sm, img_lg, bio) 
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
