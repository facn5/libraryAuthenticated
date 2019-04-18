const dbConnection = require("../database/db_connection");
const bcrypt = require("bcryptjs");

const toggleAvilable = (id) => {
  dbConnection.query(
    `UPDATE books SET avilable = NOT avilable WHERE id = '${id}';`,
    (err, result) => {
      if (err) console.log(err);
      else {
        console.log(`Book ${id} toggled`);
      }
    }
  );
};

module.exports = toggleAvilable;
