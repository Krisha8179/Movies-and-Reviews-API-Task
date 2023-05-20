const express = require('express');
const router = express.Router();

const movieController = require('../controllers/movie');
const userAuthenticate = require('../middleware/auth');


router.post('/movie/createMovie',userAuthenticate.authenticate,movieController.createMovie);
router.get('/movie/getMovies',userAuthenticate.authenticate,movieController.getMovies);
router.get('/movie/searchMovie',userAuthenticate.authenticate,movieController.searchMovie);
router.get('/movie/getMovie/:id',userAuthenticate.authenticate,movieController.getMovie);
router.post('/movie/updateMovie/:id',userAuthenticate.authenticate,movieController.updateMovie);
router.delete('/movie/deleteMovie/:id',userAuthenticate.authenticate,movieController.deleteMovie);

module.exports = router;