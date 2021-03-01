const initialUrl = `https://newyorkcomedyclub.com/comedians?page=`;
const PAGE_COMEDIANS_CONTAINERS = `.comedians-inner`;
const website = "https://newyorkcomedyclub.com";
const ERROR_CONDITION =
  "body > div > div.content.clearfix.default-content-size.side-collapse-container > h2";
const NAME_SELECTOR = ".date-div";
const PROFILE_IMG_SELECTOR = ".comedian-highlight";

const BIO_SELECTOR = ".comedian-view-description";

module.exports = {
  initialUrl,
  PAGE_COMEDIANS_CONTAINERS,
  website,
  ERROR_CONDITION,
  NAME_SELECTOR,
  PROFILE_IMG_SELECTOR,
  BIO_SELECTOR,
};
