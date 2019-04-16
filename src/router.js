
const handlers = require('./handlers');

const routers = ( req, res ) => {
  const url = req.url;

  if( url === "/" )
    handlers.page(res, "index");
  else if ( url.includes("public") )
    handlers.file(res, url);
  else if ( url === "/getBooks" && req.method === "GET" )
    handlers.getbooks( res );
  else if ( url === "/createUser" && req.method === "POST")
    handlers.createUser( req, res );
  else
    handlers.page(res, "404");

}

module.exports = routers;
