// const getGrisley = require("./scraping/clubs/GrisleyPear/getGrisley");
const fs = require("fs");
// const getNYCC = require("./scraping/clubs/NYCC/getNYCC");
// const baseScrape = require("./scraping/baseScrape");
const uploadComedians = require("./scraping/functions/uploadComedians");

async function run() {

  fs.readFile('./allComedians/allComediansGrisley.txt', 'utf8', (err, data)=>{
    if (err){
      console.log(err)
    } else {
      const comedians = JSON.parse(data)

      // const testArray = [comedians[0], comedians[1]]

      uploadComedians(comedians); 

    }
  })


  // await uploadComedians('./allComedians/allComediansGrisley.txt');
  // console.log("run");

  //Call NYCC
  // const allNyccComedians = await baseScrape(getNYCC);
  // fs.writeFileSync(
  //   "./allComedians/allComediansNYCC.txt",
  //   JSON.stringify(allNyccComedians)
  // );
  // console.log(allNyccComedians);
  //Call Grisley Pear
  //   const allGrisleyComedians = await getGrisley();
  //   fs.writeFileSync(
  //     "./clubs/GrisleyPear/allComedians.txt",
  //     JSON.stringify(allGrisleyComedians)
  //   );
  //   console.log(allGrisleyComedians);
}

run();
