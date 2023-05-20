const User = require('../models/User');
const Movie = require('../models/Review');
const Review = require('../models/Review');

exports.createMovieReview = async (req, res) => {
    try{
        const movieid = req.params.id;
        const rating = req.body.rating;
        const comment = req.body.comment;

        const findReview = await Review.findOne({where:{movieId:movieid, userId:req.user.id}});
        if(findReview){
            return res.status(400).json({message: 'you have already created the review for this movie'});
        }else{
            await Review.create({rating,comment,userId:req.user.id,movieId:movieid});
            res.status(201).json({message: 'Review created'});
        }
    } catch(err){
        res.status(500).json({error: err})
    }
}


exports.updateMovieReview = async (req, res) => {
    try{
        const movieid = req.params.id;
        const rating = req.body.rating;
        const comment = req.body.comment;

        const ratingobj = await Review.findOne({where:{movieId: movieid, userId: req.user.id}}) 

        if(ratingobj){
                await ratingobj.update({rating,comment})
                res.status(201).json({message: 'Review details updated'})
        }else{
            return res.status(404).json({message: 'you do not have any created review for this movie'});
        }
    } catch(err){
        res.status(500).json({error: err})
    }
}


exports.deleteMovieReview = async (req, res) => {
    try{
        const movieid = req.params.id;
        const ratingobj = await Review.findOne({where:{movieId: movieid, userId: req.user.id}}) 

        if(ratingobj){
            await ratingobj.destroy({where:{movieId: movieid, userId: req.user.id}})
            res.status(201).json({message: 'Review deleted'})
        }else{
            return res.status(404).json({message: 'you do not have any created review for this movie'});
        }
    } catch(err){
        res.status(500).json({error: err})
    }
}


exports.getMovieReviews = async (req, res) => {
    try{
        const movieId = req.params.id;
        const { sort, filter, page, limit } = req.query;
        const pageValue = parseInt(page) || 1;
        const limitValue = parseInt(limit) || 10;

        const sortField = sort || 'id';
        const sortOrder = sort === 'releaseDate' ? 'DESC' : 'ASC';
    
        const filterOptions = {movieId};
        if (filter) {
          filterOptions[Op.or] = [
            { movieName: { [Op.iLike]: `%${filter}%` } },
            { description: { [Op.iLike]: `%${filter}%` } },
            { directorName: { [Op.iLike]: `%${filter}%` } },
          ];
        }
    
            const ITEMS_PER_PAGE = limitValue
            const movieReviews = await Review.findAll({
                where: filterOptions,
                order: [[sortField, sortOrder]],
                offset: (pageValue - 1) * ITEMS_PER_PAGE,
                limit: ITEMS_PER_PAGE,
        });
            return res.status(200).json({movieReviews: movieReviews});
            
        } catch(err){
            res.status(500).json({error: err})
        }
}
