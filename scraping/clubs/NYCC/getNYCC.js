const variablesNYCC = require("./nyccVariables");
const singlePageNYCC = require("./singlePageNYCC");

async function getNYCC(page) {
  await page.goto(`${variablesNYCC.initialUrl}${1}`);

  let allComedians = [];

  //we got 37 by looking at the pages total pages

  for (let i = 1; i <= 37; i++) {
    let spcs = await singlePageNYCC(
      page,
      variablesNYCC.PAGE_COMEDIANS_CONTAINERS,
      variablesNYCC.website,
      variablesNYCC.NAME_SELECTOR,
      variablesNYCC.PROFILE_IMG_SELECTOR,
      variablesNYCC.BIO_SELECTOR
    ).catch((err) => console.log(err));

    allComedians = [...allComedians, ...spcs];
    await page.goto(`${variablesNYCC.initialUrl}${i + 1}`);
  }

  return allComedians;
}

module.exports = getNYCC;
