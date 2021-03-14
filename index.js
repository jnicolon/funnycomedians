// const getGrisley = require("./scraping/clubs/GrisleyPear/getGrisley");
// const getNYCC = require("./scraping/clubs/NYCC/getNYCC");
// const baseScrape = require("./scraping/baseScrape");
const fs = require("fs");
const uploadComedians = require("./postgres/uploadComedians");

async function run() {

  fs.readFile('./allComedians/allComediansNYCC.txt', 'utf8', (err, data)=>{
    if (err){
      console.log(err)
    } else {
      const comedians = JSON.parse(data)

      uploadComedians(comedians, "nycc"); 
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
