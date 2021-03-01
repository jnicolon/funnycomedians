const puppeteer = require("puppeteer");

const baseScrape = async (clubFunction) => {
  const browser = await puppeteer
    .launch({
      headless: false,
    })
    .catch((err) => console.log(err));

  const page = await browser.newPage().catch((err) => console.log(err));

  const allClubComics = await clubFunction(page);

  return allClubComics;
};

module.exports = baseScrape;
