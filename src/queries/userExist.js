const dbConnection = require("../database/db_connection");

const userExsit = (username,cb) => {


dbConnection.query(
  `SELECT username FROM users where username LIKE '${username}';`,
  (err, result) => {
    if (err) cb(err);
    else{
      console.log(result);
        if (result.rowCount !== 0)
        {
          cb(null,true)
          console.log('true');
}
        else {
          cb(null, false)
          console.log('false');

        }
    }

  })
}
module.exports = userExsit;
