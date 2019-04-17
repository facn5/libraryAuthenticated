const dbConnection = require('../database/db_connection');
const userExist = require('./userExist');

const createUser = (name, username, password, cb) => {


userExist( username, (err, exists) => {

if( err ) cb(err)

if( exists ) {
      dbConnection.query('INSERT INTO users ( name, username, password) VALUES ( $1, $2, $3 )',
        [name, username, password],
        (err, result) => {
          if (err) cb(err);
          else cb(null,"Done");
        });
    //}
  }
  else {
        cb(new Error('username_exist'));
  }
  });
}


module.exports = createUser;
