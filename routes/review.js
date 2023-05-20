const express = require('express');
const router = express.Router();

const reviewController = require('../controllers/review');
const userAuthenticate = require('../middleware/auth');


router.post('/review/createMovieReview/:id',userAuthenticate.authenticate,reviewController.createMovieReview);
router.get('/review/getMovieReviews/:id',userAuthenticate.authenticate,reviewController.getMovieReviews);
router.post('/review/updateMovieReview/:id',userAuthenticate.authenticate,reviewController.updateMovieReview);
router.delete('/review/deleteMovieReview/:id',userAuthenticate.authenticate,reviewController.deleteMovieReview);

module.exports = router;