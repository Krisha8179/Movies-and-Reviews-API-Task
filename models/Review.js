
const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Review = sequelize.define('review', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    rating: Sequelize.INTEGER,
    comment: Sequelize.STRING,
});

module.exports = Review;
