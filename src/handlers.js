const fs = require("fs");
const path = require("path");
const querystring = require("querystring");
const getBooks = require("./queries/getBooks");
const createUser = require("./queries/createUser");
const loginUser = require("./queries/loginUser");
const reserveBook = require("./queries/reserveBook");
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
      body = JSON.parse(JSON.parse(JSON.stringify(body)))
      utils.hash(body.pass, (err, hash) => {
        createUser(body.name, body.user, hash, body.pass, (err, result) => {
          if (err) {
            if (err.message === "username_exist") {
              // console.log(res);
              res.end(JSON.stringify("Error"));
            }
            return err;
          } else {
            res.writeHead(302, [
        ["Set-Cookie", "logged_in=true&username="+body.user]
          ]);
            res.end(JSON.stringify(result));
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
      //const parse = querystring.parse(body);

body = JSON.parse(JSON.parse(JSON.stringify(body)));

      loginUser(body.user, body.pass, (err, result) => {
        if (err) {

          res.writeHead(302, {location: "/"})
          res.end()
        }
        else {
console.log(result);
if( result == true) {
          res.writeHead(302, [
      ["Set-Cookie", "logged_in=true&username="+body.user]
        ]);
      }
            res.end(result.toString());

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

const handleCheckTheCookie = (req, res) => {

  let body = "";
  req.on("data", chunk => {
    body += chunk.toString();
  });
  req.on("end", () => {
    if (body != null) {
      res.writeHead(200, exType.html)
      res.end(body);

    }
  })
}

const handlereserve = (req, res) => {
  let body = "";
  req.on("data", chunk => {
    body += chunk.toString();
  });
  req.on("end", () => {
    if (body != null) {
      body = JSON.parse(JSON.parse(JSON.stringify(body)))
      reserveBook(body.id, body.username,(err,result)=>{
      });
      res.writeHead(200, exType.html)
      res.end(JSON.stringify(body));

    }
  })
}

const handleLogout = (res) => {
  res.writeHead(200, {'Set-Cookie' : 'logged_in=false&username=0; Max-Age=0;'})
  res.end('bye');
  console.log('bye');
}

module.exports = {
  page: handlePage,
  file: handlePublic,
  getbooks: handleGetBooks,
  createUser: handleCreateUser,
  login: handleUserLogin,
  checkcookie: handleCheckTheCookie,
  home: handleHome,
  logout: handleLogout,
  reserve: handlereserve
};
