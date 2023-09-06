const { DataTypes } = require("sequelize");
const db = require('../config/db');

const Role = db.define("role", {
  
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Role;
