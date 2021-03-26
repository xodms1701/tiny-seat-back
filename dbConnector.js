const Sequelize = require("sequelize");
const Op = Sequelize.Op;

require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.USERNAME,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: "mysql",
    operatorsAliases: {
      $and: Op.and,
      $or: Op.or,
      $eq: Op.eq,
      $gt: Op.gt,
      $lt: Op.lt,
      $lte: Op.lte,
      $like: Op.like,
      $ne: Op.ne,
      $between: Op.between,
      $gte: Op.gte,
    },
    logging: false,
  }
);

// const auto = new SequelizeAuto(
//   schema,
//   dbconfig.username,
//   dbconfig.password,{
//     host: dbconfig.host,
//     port: '3306'
//   });
// auto.run((err) => {
//   if(err) throw err;
// })

module.exports = sequelize;
