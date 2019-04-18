const handlers = require('./handlers');
const querystring = require('querystring');

const routers = (req, res) => {
  const url = req.url;

  if (url === "/")
  {
    if( !querystring.parse(req.headers.cookie).logged_in )
    handlers.page(res, "index");

    else {
      res.writeHead(302, {location: "/home"})
      res.end()
    }
  }
  else if (url === "/logout" && req.method === "POST")
  handlers.logout(res);
  else if (url === "/home") {
  if(  querystring.parse(req.headers.cookie).logged_in )
  handlers.page(res, "home");

else {
  res.writeHead(302, {location: "/"})
  res.end()
}
}
  else if (url === "/signup")
  {
    handlers.page(res, "signup");
    {
      if( !querystring.parse(req.headers.cookie).logged_in )
      handlers.page(res, "signup");

      else {
        res.writeHead(302, {location: "/home"})
        res.end()
      }
    }
  }
  else if (url.includes("public"))
    handlers.file(res, url);
  else if (url === "/getBooks" && req.method === "GET")
    handlers.getbooks(res);
  else if (url === "/createUser" && req.method === "POST")
    handlers.createUser(req, res);
  else if (url === "/login" && req.method === "POST")
    handlers.login(req, res);
  else if (url === "/checkmycookie")
    handlers.checkcookie(req, res);
  else if (url === "/reserveBook" && req.method === "POST")
    handlers.reserve(req, res);
  else
    handlers.page(res, "404");

}

module.exports = routers;
