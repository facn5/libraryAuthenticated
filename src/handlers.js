const fs = require("fs");
const path = require("path");
const getBooks = require("./queries/getBooks");

const serverError = "500 server error";

const exType = {
  html: { "Content-Type": "text/html" },
  css: { "Content-Type": "text/css" },
  js: { "Content-Type": "application/javascript" },
  json: { "content-type": "application/json" }
};

const handlePage = (res, str) => {
  const filePath = path.join(
    __dirname,
    "..",
    "public",
    "layouts",
    str + ".html"
  );

  fs.readFile(filePath, (err, file) => {
    if (err) {
      res.writeHead(500);
      res.end(serverError);
    } else {
      res.writeHead(200, exType.html);
      res.end(file);
    }
  });
};

const handlePublic = (res, url) => {
  const filePath = path.join(__dirname, "..", url);

  const ext = url.split(".")[1];

  fs.readFile(filePath, (err, file) => {
    if (err) {
      res.writeHead(500);
      res.end(serverError);
    } else {
      res.writeHead(200, exType[ext]);
      res.end(file);
    }
  });
};

const handleGetBooks = res => {
  getBooks((err, result) => {
    if (err) {
      res.writeHead(500);
      res.end(serverError);
    } else {
      let dynamicData = JSON.stringify(result);
      res.writeHead(200, extType.json);
      res.end(dynamicData);
    }
  });
};

module.exports = {
  page: handlePage,
  file: handlePublic,
  getbooks: handleGetBooks
};
