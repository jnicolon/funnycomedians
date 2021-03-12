const checkError = require("../../functions/checkError");
const variablesNYCC = require("./nyccVariables");
const singlePageNYCC = require("./singlePageNYCC");

async function getNYCC(page) {
  await page.goto(`${variablesNYCC.initialUrl}${1}`);

  async function getAllComedians(index, array) {
    let pageNum = index;
    let allComedians = array;

    let spcs = await singlePageNYCC(
      page,
      variablesNYCC.PAGE_COMEDIANS_CONTAINERS,
      variablesNYCC.website,
      variablesNYCC.NAME_SELECTOR,
      variablesNYCC.PROFILE_IMG_SELECTOR,
      variablesNYCC.BIO_SELECTOR
    ).catch((err) => console.log(err));

    allComedians = [...allComedians, ...spcs];

    let error;
    if (pageNum === 2) {
      error = true;
    } else error = false;

    // let error = await checkError(
    //   page,
    //   variablesNYCC.ERROR_CONDITION
    // ).catch((err) => console.log(err));

    if (!error) {
      pageNum++;
      await page.goto(`${variablesNYCC.initialUrl}${pageNum}`);

      await getAllComedians(pageNum, allComedians).catch((err) =>
        console.log(err)
      );
    }

    return allComedians;
  }

  const allComedians = await getAllComedians(1, []).catch((err) =>
    console.log(err)
  );

  return allComedians;
}

module.exports = getNYCC;
