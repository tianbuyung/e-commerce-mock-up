'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product, { foreignKey: "UserId" });
      User.hasOne(models.Profile, { foreignKey: "UserId" });
    }
  }
  User.init(
    {
      username: {
        // type: DataTypes.STRING,
        // validate: {
        //   notEmpty: {
        //     args: true,
        //     msg: "Username tidak boleh kosong",
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Username cant be null' },
          notEmpty: { msg: 'Username cant be Empty' }
          
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Email cant be null' },
          notEmpty: { msg: 'Email cant be Empty' }
          
        },
      },

      password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Password cant be null' },
        notEmpty: { msg: 'Password cant be Empty' }
        },
      },

      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Role cant be null' },
          notEmpty: { msg: 'Role cant be Empty' }
        },
      },
    },
    {
      hooks: {
        beforeCreate(instance, option) {
          const salt = bcrypt.genSaltSync(8);
          const hash = bcrypt.hashSync(instance.password, salt);
          instance.password = hash;
          // console.log(instance, "---> di beforeCreate");
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
