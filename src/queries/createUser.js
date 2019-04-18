const dbConnection = require('../database/db_connection');
const userExist = require('./userExist');

const createUser = (name, username, password, cb) => {


userExist( username, (err, exists) => {

if( err ) cb(err)

if( !exists && usernameValdiated(username)) {
      dbConnection.query('INSERT INTO users ( name, username, password) VALUES ( $1, $2, $3 )',
        [name, username, password],
        (err, result) => {
          if (err) cb(err);
          else cb(null,"Done");
        });
    //}
  }else if (!usernameValdiated(username)){
    cb(null,"0")
  }
  else {
        cb(new Error('username_exist'));
  }
  });
}

const usernameValdiated = (str) => {
    if( str.trim() == "" )
    return false;
    else if ( str.trim().length < 6 )
    return false;
    else if ( !/\d/.test(str))
    return false
    else if ( /^\d+$/.test(str) )
    return ture;
}


module.exports = createUser;
