const fs = require("fs");
const path = require("path");
const querystring = require("querystring");
const getBooks = require("./queries/getBooks");
const createUser = require("./queries/createUser");
const loginUser = require("./queries/loginUser");
const utils = require("./utils");
const serverError = "500 server error";

const exType = {
  html: {
    "Content-Type": "text/html"
  },
  css: {
    "Content-Type": "text/css"
  },
  js: {
    "Content-Type": "application/javascript"
  },
  json: {
    "content-type": "application/json"
  }
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
      res.writeHead(200, exType.json);
      res.end(dynamicData);
    }
  });
};

const handleCreateUser = (req, res) => {
  let body = "";
  req.on("data", chunk => {
    body += chunk.toString();
  });

  req.on("end", () => {
    if (body != null) {
      const parse = querystring.parse(body);
      utils.hash(parse.password, (err, hash) => {
        createUser(parse.name, parse.username, hash, (err, result) => {
          if (err) {
            if (err.message === "username_exist") {
              // console.log(res);
              console.log(err.message);
              res.writeHead(409);
              res.end("username Exist");
            }
            return err;
          } else {
            res.body;
            res.writeHead(302, {
              location: "/"
            });
            res.end();
          }
        });
      });
    }
  });
};

const handleUserLogin = (req, res) => {
  let body = "";
  req.on("data", chunk => {
    body += chunk.toString();
  });
  req.on("end", () => {
    if (body != null) {
      const parse = querystring.parse(body);

      loginUser(parse.username, parse.password, (err, result) => {
        if (err) console.log(err);
        else {
          if (result) {

                const cryptoPass = utils.functions.sign(parse.password);

            res.writeHead(302, [
              ["location", "/home"],
              ["Set-Cookie", "logged_in=true"],
              [`Set-Cookie`, `username=${parse.username}`],
              ['Set-Cookie', `password=${cryptoPass}`]
            ]);

            res.end();
          } else {
            res.writeHead(409);
            res.end("Invalid username or password");
          }
        }
      });
    }
  });
};

const handleHome = (res, url) => {
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

const handleCheckTheCookie = ( req, res ) => {

  let body = "";
  req.on("data", chunk => {
    body += chunk.toString();
  });
  req.on("end", () => {
    if (body != null) {

      console.log(body);
      res.writeHead(200, exType.html)
      res.end(body);

    }
  })
}

const handlereserve = ( req, res ) => {
  let body = "";
  req.on("data", chunk => {
    body += chunk.toString();
  });
  req.on("end", () => {
    if (body != null) {
      body = JSON.parse(JSON.parse(JSON.stringify(body)))
      console.log(body);
      res.writeHead(200, exType.html)
      res.end(JSON.stringify(body));

    }
  })
}

module.exports = {
  page: handlePage,
  file: handlePublic,
  getbooks: handleGetBooks,
  createUser: handleCreateUser,
  login: handleUserLogin,
  checkcookie: handleCheckTheCookie,
  home: handleHome,
  reserve:handlereserve
};
