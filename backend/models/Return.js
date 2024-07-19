const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database'); 

const Return = sequelize.define('return', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
  returnTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fine: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0.0,
  },
}, {
  timestamps: false,
 });

module.exports = Return;
