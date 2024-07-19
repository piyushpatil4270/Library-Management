const Sequelize = require("sequelize")

const sequelize=new Sequelize('test1','root','Piyush@nyc85',{dialect:'mysql',host:'localhost'})


module.exports=sequelize