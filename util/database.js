const Sequelize = require('sequelize');
require("dotenv").config();

const sequelize = new Sequelize(`${process.env.POSTGRESQL_DATABASE}`,`${process.env.POSTGRESQL_USER}`,`${process.env.POSTGRESQL_PASSWORD}`, {
    dialect: 'postgres',
    host: `${process.env.DB_HOST}`
});

module.exports = sequelize;