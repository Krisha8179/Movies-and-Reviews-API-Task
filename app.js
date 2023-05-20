const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');



const cors = require('cors');
const User = require('./models/User');
const Review = require('./models/Review');
const Movie = require('./models/Movie');
const sequelize = require('./util/database');

const userRoutes = require('./routes/user');
const movieRoutes = require('./routes/movie');
const reviewRoutes = require('./routes/review');

const app = express();

app.use(cors());
app.use(bodyParser.json({extended: false}));

app.use(userRoutes);
app.use(movieRoutes);
app.use(reviewRoutes);

User.hasMany(Movie);
Movie.belongsTo(User);

Review.belongsTo(User);

Movie.hasMany(Review);
Review.belongsTo(Movie);

sequelize
.sync()
.then(result => {
    //console.log(result);
    app.listen(3000);
})
.catch(err => {
    console.log(err);
});
