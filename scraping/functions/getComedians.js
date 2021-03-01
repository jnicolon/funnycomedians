const $ = require("cheerio");

//for Grisley pear
async function comedianImgs(html, selector) {
  const allImgs = $(selector, html);

  const imgs = [];

  allImgs.find("img").each((i, el) => {
    let comedian = {
      img: el.attribs.src,
    };
    return imgs.push(comedian);
  });

  return imgs;
}

//For more generic NYCC where the selector is more accesible
async function singleImg(html, selector) {
  const selectedImg = $(selector, html);

  const img = selectedImg;
  console.log(img);
  return { img };
}

async function comedianLinks(html, selector, website) {
  const allLinks = $(selector, html);

  const links = [];

  allLinks.find("a").each((i, el) => {
    if (el.attribs.href !== undefined) {
      links.push(`${website}${el.attribs.href}`);
    }
  });

  const noDuplicatesLinksArray = Array.from(new Set(links));
  return noDuplicatesLinksArray;
}

async function comedianText(html, selector) {
  const title = $(selector, html);
  const name = title.text();
  return name;
}

module.exports = {
  comedianImgs,
  comedianLinks,
  comedianText,
  singleImg,
};
