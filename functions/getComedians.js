const $ = require("cheerio");

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

async function comedianLinks(html, selector, website) {
  const allLinks = $(selector, html);

  const links = [];

  allLinks.children().each((i, el) => {
    if (el.attribs.href !== undefined) {
      links.push(`${website}${el.attribs.href}`);
    }
  });
  return links;
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
};
