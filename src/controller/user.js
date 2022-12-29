const { user } = require('../app/models');
const fs = require('fs');
const generateJWT = require('../helpers/generateJWT');
class UserController{
  // static function
  static async index(req, res,next){
    try {
      const users = await user.findAll();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  static async login(req,res,next){
    try {
      const { email, password } = req.body;
      console.log(email, password)
      const data = await user.findOne({
        where: { email },
        plain: true,
      });
      if(!data) throw new Error('Email or password is wrong');
      const isValid = data.checkPassword(password);
      if(!isValid) throw new Error('Email or password is wrong');
      delete data.dataValues.password;
      console.log(generateJWT)
      const token = generateJWT(data.dataValues);
      data.api_token = token;
      await data.save();
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  static async register(req,res,next){
    try {
      const { username, email, password } = req.body;
      if(!req.file) throw new Error('Avatar is required')
      const avatar = req.file.filename;
      console.log(username, email, password, avatar)
      const data = await user.scope('withoutPassword').create({
        username,
        email,
        password,
        avatar_url: avatar
      });
      res.json(data);
    } catch (error) {
      // unlink file
      if(req.file){
        const path = `./public/uploads/${req.file.filename}`;
        fs.unlink(path
          , (err) => {
            if (err) {
              console.error(err)
              return
            }
          })
      }
      next(error);
    }
  }
}

module.exports = UserController;