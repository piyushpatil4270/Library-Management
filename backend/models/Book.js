const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Book = sequelize.define(
  "book",
  {
    id:{
      type:DataTypes.INTEGER,
     allowNull:false,
     autoIncrement:true,
     primaryKey:true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    issueTime: {
      type: DataTypes.DATE,
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
  },
  {
    timestamps: false,
  }
);

module.exports = Book;
