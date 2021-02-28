const rp = require("request-promise");
const $ = require("cheerio");
const url = "https://www.grislypearstandup.com/comedians/";

// const getGrisleyComedians = async () => {
//   const comedians = [];
//   const getAllComedians = async (i) => {
//     let page = i;
//     const html = await rp(
//       `https://www.grislypearstandup.com/comedians?page=${page}`
//     );
//     console.log($("p", html).length);
//   };
//   getAllComedians(10).catch((err) => console.log(err));
// };

// getGrisleyComedians().catch((err) => console.log(err));

rp(url)
  .then((html) => {
    const comedians = [];

    $("img", html).each((i, img) => {
      comedians.push({
        src: `https://www.grislypearstandup.com/${img.attribs.src}`,
        name: img.attribs.title,
      });
    });

    console.log(comedians);
  })
  .catch((err) => {
    console.log(err);
  });

rp(comedianUrl)
  .then((html) => {
    console.log($(".scheduled-name", html).text());
  })
  .catch((err) => {
    console.log(err);
  });
