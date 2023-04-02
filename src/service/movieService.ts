import { errorConstants } from "../../constants/errorConstants";
import Movies from "../models/movies";
import { Movie } from "../schema/types";
const { Op } = require('sequelize');

export const addMovieService = async (args: Movie) => {
    const movie = await Movies.create({ ...args });

    return movie || {};
}

export const editMovieService = async (args: Movie) => {
    // find movie review
    const movie = await Movies.findOne({where: {
        id: args.id,
    }});

    if (!movie) {
        throw new Error(errorConstants.MOVIE_DOES_NOT_EXIST);
    }
   
    // update movie
    await Movies.update({ name: args.name, description: args.description, director: args.director, releaseDate: args.releaseDate }, { where: { id: args.id }, returning: true });

    return { success: true, message: 'successefully edited' };
}

export const deletMovieService = async ({ id }: {id: number}) => {
    // find movie
    const movie = await Movies.findByPk(id);

    if (!movie) {
        throw new Error(errorConstants.MOVIE_DOES_NOT_EXIST);
    }

    // delet movie
    await movie.destroy();

    return { success: true };
}

export const getMoviesList = async ({ limit, offset, search }: { limit: number, offset: number, search: string}) => {
    // where object to filter the movies
    const where = search ? {
        [Op.or]: [
          { name: { [Op.iLike]: `%${search}%` } },
          { description: { [Op.iLike]: `%${search}%` } },
        ],
      } : {};

    //  fetch total count of movies
    const totalCount = await Movies.count({where}); // get the total count of movies
    
    const movies = await Movies.findAll({ where, limit, offset, order: [['id', 'DESC']] }); // fetch the movies with the specified limit and offset
    
    return { count: totalCount, movies }; // return the paginated movie list with the total count
}

export const getMovieById = async ({ id }: {id: number}) => {
    const movie = await Movies.findByPk(id);

    if (!movie) {
        throw new Error(errorConstants.MOVIE_DOES_NOT_EXIST);
    }

    return movie;
}