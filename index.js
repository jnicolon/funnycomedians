const getGrisley = require("./scraping/clubs/GrisleyPear/getGrisley");
const fs = require("fs");

async function run() {
  const allGrisleyComedians = await getGrisley();

  fs.writeFileSync(
    "./clubs/GrisleyPear/allComedians.txt",
    JSON.stringify(allGrisleyComedians)
  );

  console.log(allGrisleyComedians);
}

run();
