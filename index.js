const puppeteer = require("puppeteer");
const $ = require("cheerio");

async function run() {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  const url = `https://www.grislypearstandup.com/comedians?page=${1}`;

  await page.goto(url);

  const ALL_COMEDIANS_CONTAINERS = `.comedian-image-container`;

  let html = await page.content();

  async function getComedianImgs(html, selector) {
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

  async function getComedianLinks(html, selector, website) {
    const allLinks = $(selector, html);

    const links = [];

    allLinks.children().each((i, el) => {
      if (el.attribs.href !== undefined) {
        links.push(`${website}${el.attribs.href}`);
      }
    });
    return links;
  }

  async function getComedianName(html, selector) {
    const title = $(selector, html);
    const name = title.text();
    return name;
  }

  async function getComedians(startHtml, mainSelector, website) {
    let html = startHtml;
    const allComedians = $(mainSelector, html);

    let comediansResult = [];

    let singleComedian = {
      name: "",
      imgLg: "",
      imgSm: "",
      bio: "",
    };

    const comedianImgsSm = await getComedianImgs(html, allComedians);

    comedianImgsSm.forEach((img) => {
      comediansResult.push({
        ...singleComedian,
        imgSm: `${website}${img.img}`,
      });
    });

    const comedianLinks = await getComedianLinks(html, allComedians, website);

    for (let i = 0; i < comedianLinks.length; i++) {
      await page.goto(comedianLinks[i]);
      html = await page.content();
      const NAME_SELECTOR = ".scheduled-name";
      const PROFILE_IMG_SELECTOR = ".comedian-highlight";
      const BIO_SELECTOR = ".comedian-description";

      comediansResult[i].name = await getComedianName(html, NAME_SELECTOR);
      const imgLg = await getComedianImgs(html, PROFILE_IMG_SELECTOR);
      comediansResult[i].imgLg = `${website}${imgLg[0].img}`;
      const bio = await getComedianName(html, BIO_SELECTOR);
      comediansResult[i].bio = bio;
    }

    console.log(comediansResult);
  }

  const website = "https://www.grislypearstandup.com";

  getComedians(html, ALL_COMEDIANS_CONTAINERS, website);

  async function checkError(ERROR_CONDITION) {
    let error = await page.evaluate((sel) => {
      let html = document.querySelector(sel);
      if (html === null) {
        return true;
      } else {
        return false;
      }
    }, ERROR_CONDITION);
    return error;
  }

  async function getPageNum(checkErrorFunction, index) {
    let pageNum = index;
    const H2_ERROR = "body > div > div > h2";
    let error = await checkErrorFunction(H2_ERROR);
    if (error) {
      pageNum++;
      await page.goto(
        `https://www.grislypearstandup.com/comedians?page=${pageNum}`
      );
      await getPageNum(checkErrorFunction, pageNum);
    }
    return;
  }
}

run();
