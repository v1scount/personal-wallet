const { DataTypes,Sequelize } = require('sequelize');
const bcrypt =require("bcrypt");
// const sequelize = require('../db')

module.exports = (sequelize) => {
  sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email address already in use!'
      },
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  }, {
    timestamps: false
  })

}
// module.exports = User;
