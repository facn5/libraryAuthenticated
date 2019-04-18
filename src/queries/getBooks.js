const dbConnection = require('../database/db_connection');

const getBooks = ( cb ) => {
  dbConnection.query('SELECT * FROM books ORDER BY id ASC;',(err, result) => {
    if(err) cb(err);
    cb(null, result.rows);
  });
}

module.exports = getBooks;
