
const handlers = require('./handlers');

const routers = ( req, res ) => {
  const url = req.url;

  if( url === "/" )
    handlers.page(res, "index");
  else
    handlers.page(res, "404");

}

module.exports = routers;
