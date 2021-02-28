async function checkError(page, ERROR_CONDITION) {
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

module.exports = checkError;
