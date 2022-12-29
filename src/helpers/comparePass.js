const bcrypt = require('bcrypt');

module.exports={
  comparePass: (password, hash) => {
    return bcrypt.compareSync(password, hash);
  }

}

