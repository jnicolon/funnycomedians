const getSinglePageComedians = require("../../functions/getSinglePageComedians");
const variablesNYCC = require("./nyccVariables");

async function singlePageNYCC(page, mainSelector, website) {
  const singlePageComedians = await getSinglePageComedians(
    page,
    mainSelector,
    website,
    variablesNYCC.NAME_SELECTOR,
    variablesNYCC.PROFILE_IMG_SELECTOR,
    variablesNYCC.BIO_SELECTOR
  );

  singlePageComedians.forEach((comedian) => {
    let trimName = comedian.name.replace("- Comedian - Tickets", "").trim();
    comedian.name = trimName;
    let trimBio = comedian.bio.replace("\n", "").trim();
    comedian.bio = trimBio;
  });

  return singlePageComedians;
}

module.exports = singlePageNYCC;
