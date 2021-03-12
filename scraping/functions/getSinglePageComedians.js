const $ = require("cheerio");
const get = require("./getComedians");

async function getSinglePageComedians(
  page,
  PAGE_COMEDIANS_CONTAINERS,
  website,
  NAME_SELECTOR,
  PROFILE_IMG_SELECTOR,
  BIO_SELECTOR
) {
  let html = await page.content().catch((err) => console.log(err));

  const comediansContainer = $(PAGE_COMEDIANS_CONTAINERS, html);

  let allComedians = [];

  let singleComedian = {
    name: "",
    imgLg: "",
    imgSm: "",
    bio: "",
  };

  //Get all thumbnail imgs

  const comedianImgsSm = await get
    .comedianImgs(html, comediansContainer)
    .catch((err) => console.log(err));

  comedianImgsSm.forEach((img) => {
    allComedians.push({
      ...singleComedian,
      imgSm: `${website}${img.img}`,
    });
  });

  //Go to every comedian profile and get img, name and profile

  const comedianLinks = await get
    .comedianLinks(html, comediansContainer, website)
    .catch((err) => console.log(err));

  for (let i = 0; i < comedianLinks.length; i++) {
    await page.goto(comedianLinks[i]).catch((err) => console.log(err));

    html = await page.content().catch((err) => console.log(err));

    allComedians[i].name = await get
      .comedianText(html, NAME_SELECTOR)
      .catch((err) => console.log(err));

    const imgLg = await get
      .comedianImgs(html, PROFILE_IMG_SELECTOR)
      .catch((err) => console.log(err));
    allComedians[i].imgLg = `${website}${imgLg[0].img}`;

    let bio = await get
      .comedianText(html, BIO_SELECTOR)
      .catch((err) => console.log(err));
    allComedians[i].bio = bio;
  }

  return allComedians;
}

module.exports = getSinglePageComedians;
