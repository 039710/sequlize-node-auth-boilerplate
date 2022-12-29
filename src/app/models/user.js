'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    checkPassword(password){
      return bcrypt.compareSync(password, this.password);
    }
  };
  user.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Username is required'
        },
        notEmpty: {
          msg: 'Username is required'
        },
        len: {
          args: [3, 20],
          msg: 'Username must be between 3 and 20 characters'
        },
        isUnique: async function (value, next) {
          const username = await user.findOne
            ({
              where: { username: value }
            });
          if (username) {
            return next('Username already exists');
          }
          return next();
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Email is required'
        },
        notEmpty: {
          msg: 'Email is required'
        },
        isEmail: {
          msg: 'Email is invalid'
        },
        isUnique: async function (value, next) {
          const email = await user.findOne
            ({
              where: { email: value }
            });
          if (email) {
            return next('Email already exists');
          }
          return next();
        }
      }
    },
    avatar_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Avatar is required'
        },
        notEmpty: {
          msg: 'Avatar is required'
        },
        isUrl: {
          msg: 'Avatar is invalid'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password is required'
        },
        notEmpty: {
          msg: 'Password is required'
        },
        len: {
          args: [6, 20],
          msg: 'Password must be between 6 and 20 characters'
        }
      }
    },

    api_token: DataTypes.TEXT,
    deleted_at: DataTypes.DATE
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        const salt = bcrypt.genSaltSync(6);
        user.password = bcrypt.hashSync(user.password, salt);
      }

    },
    scopes: {
      withoutPassword: {
        attributes: { exclude: ['password'] }
      }
    },
    sequelize,
    modelName: 'user',
  });
  return user;
};