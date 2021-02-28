const puppeteer = require("puppeteer");
const singlePageGrisley = require("./singlePageGrisley");
const checkError = require("../../functions/checkError");

async function getGrisley() {
  const browser = await puppeteer
    .launch({
      headless: false,
    })
    .catch((err) => console.log(err));

  const page = await browser.newPage().catch((err) => console.log(err));

  await page.goto(`https://www.grislypearstandup.com/comedians?page=${1}`);

  async function getAllComedians(index, array) {
    let pageNum = index;
    let allGrisleyComedians = array;

    const PAGE_COMEDIANS_CONTAINERS = `.comedian-image-container`;
    const website = "https://www.grislypearstandup.com";

    let spcs = await singlePageGrisley(
      page,
      PAGE_COMEDIANS_CONTAINERS,
      website
    ).catch((err) => console.log(err));

    allGrisleyComedians = [...allGrisleyComedians, ...spcs];

    const H2_ERROR = "body > div > div > h2";
    let error = await checkError(page, H2_ERROR).catch((err) =>
      console.log(err)
    );

    if (error) {
      pageNum++;
      await page.goto(
        `https://www.grislypearstandup.com/comedians?page=${pageNum}`
      );

      await getAllComedians(pageNum, allGrisleyComedians).catch((err) =>
        console.log(err)
      );
    } else {
      return allGrisleyComedians;
    }

    return allGrisleyComedians;
  }

  const allGrisleyComedians = await getAllComedians(1, []).catch((err) =>
    console.log(err)
  );

  return allGrisleyComedians;
}

module.exports = getGrisley;
