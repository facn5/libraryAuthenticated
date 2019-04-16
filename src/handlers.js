const fs = require('fs');
const path = require('path');

const exType = {
  html: { "Content-Type": "text/html" },
  css: { "Content-Type": "text/css" },
  js: { "Content-Type": "application/javascript" }
}

const handlePage = ( res, str ) => {

  const filePath = path.join(__dirname, "..", "public", "layouts", str + ".html")

   fs.readFile( filePath, ( err, file ) => {
     if( err ) {
       res.writeHead(500);
       res.end("500 server error")
     }
     else {
       res.writeHead(200, exType.html )
       res.end(file);
     }
   })
}

module.exports = {
  page: handlePage
}
