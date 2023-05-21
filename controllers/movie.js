const User = require('../models/User');
const Movie = require('../models/Movie');
const { Op } = require('sequelize');

exports.createMovie = async (req, res) => {
    try{
    const movieName = req.body.movieName;
    const description = req.body.description;
    const directorName = req.body.directorName;
    const releaseDate = req.body.releaseDate;

    await Movie.create({movieName,description,directorName,releaseDate,userId:req.user.id});
    res.status(201).json({message: 'Movie created'});
    } catch(err){
        res.status(500).json({error: err})
    }
}


exports.updateMovie = async (req, res) => {
    try{
        const movieid = req.params.id;

        const movieName = req.body.movieName;
        const description = req.body.description;
        const directorName = req.body.directorName;
        const releaseDate = req.body.releaseDate;

        const movieobj = await Movie.findByPk(movieid) 

        if(movieobj){
            if(movieobj.userId === req.user.id){
                await movieobj.update({movieName,description,directorName,releaseDate})
                res.status(201).json({message: 'movie details updated'})
            }
            else{
                return res.status(401).json({message: 'You are not authorized to update this movie'});
            }
        }
    } catch(err){
        res.status(500).json({error: err})
    }
}


exports.deleteMovie = async (req, res) => {
    try{
        const movieid = req.params.id;
        const movieobj = await Movie.findByPk(movieid) 

        if(movieobj){
            if(movieobj.userId === req.user.id){
                await Movie.destroy({where:{id:movieid}})
                res.status(201).json({message: 'movie deleted'})
            }
            else{
                return res.status(401).json({message: 'You are not authorized to update this movie'});
            }
        }
    } catch(err){
        res.status(500).json({error: err})
    }
}


exports.getMovies = async (req, res) => {
    try{

    const { sort, filter, page, limit } = req.query;
    const pageValue = parseInt(page) || 1;
    const limitValue = parseInt(limit) || 10;

    const sortField = sort || 'id';
    const sortOrder = sort === 'releaseDate' ? 'DESC' : 'ASC';

    const filterOptions = {};
    if (filter) {
      filterOptions[Op.or] = [
        { movieName: { [Op.iLike]: `%${filter}%` } },
        { description: { [Op.iLike]: `%${filter}%` } },
        { directorName: { [Op.iLike]: `%${filter}%` } },
      ];
    }

        const ITEMS_PER_PAGE = limitValue
        console.log('page:',pageValue,'limit:',ITEMS_PER_PAGE)
        const totalMovies = await Movie.count();
        console.log('count:',totalMovies)
        const movies = await Movie.findAll({
            where: filterOptions,
            order: [[sortField, sortOrder]],
            offset: (pageValue - 1) * ITEMS_PER_PAGE,
            limit: ITEMS_PER_PAGE,
    });
        return res.status(200).json({Allmovies: movies});

    } catch(err){
        res.status(500).json({error: err})
    }
}


exports.searchMovie = async (req, res) => {
    try{

        const { search } = req.query;
        console.log('search:',search)

        const movies = await Movie.findAll({
          where: {
            [Op.or]: [
              { movieName: { [Op.iLike]: `%${search}%` } },
              { description: { [Op.iLike]: `%${search}%` } },
            ],
          },
        });

    res.status(200).json({Movies: movies});
        
    } catch(err){
        res.status(500).json({error: err})
    }
}


exports.getMovie =  async (req, res) => {
    try{
        const movieid = req.params.id;
        const findmovie = await Movie.findByPk(movieid);

        if(findmovie){
            res.status(200).json({searchedMovie: findmovie});
        }else{
            return res.status(404).json({message:'not found'});
        } 
    } catch(err){
        res.status(500).json({error: err})
    }
}