const dbConnection = require("../database/db_connection");
const bcrypt = require("bcryptjs");
const toggleAvilable = require("./toggleBookAvilable.js");
const reserveBook = (id, username, cb) => {
  dbConnection.query(
    `UPDATE users SET reservedbooks = ${id} WHERE username = '${username}'`,
    (err, result) => {
      if (err) cb(err);
      else {
        toggleAvilable(id);
        console.log(`book ${id} reserved`);
        cb(null);
      }
    }
  );
};

module.exports = reserveBook;
