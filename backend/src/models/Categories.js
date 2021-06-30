const { DataTypes ,Sequelize} = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    timestamps: true
  })
}