const { DataTypes } = require("sequelize");
const db = require('../config/db');

const User = db.define("user", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
   
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
   
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
   
  },
});

module.exports = User;
