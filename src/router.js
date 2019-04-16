
const handlers = require('./handlers');

const routers = ( req, res ) => {
  const url = req.url;

  if( url === "/" )
    handlers.page(res, "index");
  else if ( url.includes("public") )
    handlers.file(res, url);
  else if ( url === "/getbooks" && req.method === "GET" )
    handlers.getbooks( res );
  else
    handlers.page(res, "404");

}

module.exports = routers;
