const dbConnection = require("../database/db_connection");
const userExist = require('./userExist');
const bcrypt = require("bcryptjs");

const loginUser = (username, password, cb) => {

userExist( username , (err,exists)=> {
if(err) cb(err)
if(exists){

  dbConnection.query(
    `SELECT password FROM users where username LIKE '${username}';`,
    (err, result) => {
      if (err) cb(err);
      else {

        bcrypt.compare(password, result.rows[0].password, function(err, res) {
          if (err) console.log("error");
          cb(null, res);
        });
      }
    }
  );}
else{           cb(null, false);
}
})
};

module.exports = loginUser;
