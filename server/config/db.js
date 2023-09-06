const { Sequelize } = require('sequelize');

module.exports = new Sequelize("mern_auth", "root", "redhat", {
    host: "localhost",
    dialect: 'mysql',
      dialectOptions: {
          charset: 'utf8mb4',
      }, // Use the appropriate dialect for your database
  });;
