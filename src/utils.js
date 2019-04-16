const bcrypt = require('bcryptjs');

const hashPassword = (password, callback) => {
  bcrypt.genSalt(10,function(err,salt){
    bcrypt.hash(password, salt, function(err, hash) {
      if( err )
         callback(null)
      else
         callback(null, hash)
    });
  });
};

const comparePasswords = (password, hashedPassword, callback) => {
  bcrypt.compare(password, hashedPassword, callback);
};

module.exports = {
  hash:hashPassword,
  compare:comparePasswords
}
