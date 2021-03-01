// const getGrisley = require("./scraping/clubs/GrisleyPear/getGrisley");
const fs = require("fs");
const getNYCC = require("./scraping/clubs/NYCC/getNYCC");
const baseScrape = require("./scraping/baseScrape");

async function run() {
  //Call NYCC

  const allNyccComedians = await baseScrape(getNYCC);
  fs.writeFileSync(
    "./allComedians/allComediansNYCC.txt",
    JSON.stringify(allNyccComedians)
  );
  console.log(allNyccComedians);

  //Call Grisley Pear
  //   const allGrisleyComedians = await getGrisley();
  //   fs.writeFileSync(
  //     "./clubs/GrisleyPear/allComedians.txt",
  //     JSON.stringify(allGrisleyComedians)
  //   );
  //   console.log(allGrisleyComedians);
}

run();
