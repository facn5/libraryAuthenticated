const dbConnection = require('../database/db_connection');

const createUser = ( name, username, password, cb ) => {
  dbConnection.query('INSERT INTO users ( name, username, password) VALUES ( $1, $2, $3 )',
  [name, username, password],
  (err, result) => {
    if(err) cb(err);
    else cb(null);
  });
}

module.exports = createUser;
