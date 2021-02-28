const $ = require("cheerio");
const get = require("../../functions/getComedians");

async function singlePageGrisley(page, mainSelector, website) {
  let html = await page.content().catch((err) => console.log(err));
  const allComedians = $(mainSelector, html);

  let comediansResult = [];

  let singleComedian = {
    name: "",
    imgLg: "",
    imgSm: "",
    bio: "",
  };

  //Get all thumbnail imgs

  const comedianImgsSm = await get
    .comedianImgs(html, allComedians)
    .catch((err) => console.log(err));

  comedianImgsSm.forEach((img) => {
    comediansResult.push({
      ...singleComedian,
      imgSm: `${website}${img.img}`,
    });
  });

  //Go to every comedian profile and get img, name and profile

  const comedianLinks = await get
    .comedianLinks(html, allComedians, website)
    .catch((err) => console.log(err));

  for (let i = 0; i < comedianLinks.length; i++) {
    await page.goto(comedianLinks[i]).catch((err) => console.log(err));
    html = await page.content().catch((err) => console.log(err));

    const NAME_SELECTOR = ".scheduled-name";
    const PROFILE_IMG_SELECTOR = ".comedian-highlight";
    const BIO_SELECTOR = ".comedian-description";

    comediansResult[i].name = await get
      .comedianText(html, NAME_SELECTOR)
      .catch((err) => console.log(err));

    const imgLg = await get
      .comedianImgs(html, PROFILE_IMG_SELECTOR)
      .catch((err) => console.log(err));
    comediansResult[i].imgLg = `${website}${imgLg[0].img}`;

    let bio = await get
      .comedianText(html, BIO_SELECTOR)
      .catch((err) => console.log(err));
    bio = bio.replace("/n", "");
    bio = bio.trim();
    comediansResult[i].bio = bio;
  }

  return comediansResult;
}

module.exports = singlePageGrisley;
