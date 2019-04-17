const handlers = require('./handlers');

const routers = (req, res) => {
    const url = req.url;

    if (url === "/")
      handlers.page(res, "index");
    else if (url === "/home")
      handlers.page(res, "home");
    else if (url === "/signup")
      handlers.page(res, "signup");
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
