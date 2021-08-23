const { DataTypes ,Sequelize} = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM,
      values: ['Income', 'Outcome'],
      allowNull: false
    }
  }, {
    timestamps: true
  })
}