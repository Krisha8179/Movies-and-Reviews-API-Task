
const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Movie = sequelize.define('movie', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    movieName: Sequelize.STRING,
    description: Sequelize.STRING,
    directorName: Sequelize.STRING,
    releaseDate: Sequelize.DATE,
});

module.exports = Movie;
