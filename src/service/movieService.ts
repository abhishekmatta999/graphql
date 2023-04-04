import { errorConstants } from "../../constants/errorConstants";
import { validate } from "../../lib/validator";
import Movies from "../models/movies";
import { Movie } from "../schema/types";
import { addMovieSchema, deleteMovieSchema, editMovieSchema } from "../validations/movieSchemaValidations";
const { Op } = require('sequelize');

export const addMovieService = async (args: Movie, context: any) => {
    const { user } = context;

    let { releaseDate } = args;

    // validate movie schema
    validate(addMovieSchema, args);

    let date = new Date();

    if (releaseDate) date = new Date(releaseDate);

    const movie = await Movies.create({ ...args, releaseDate: date, userId: user.id });

    return movie || {};
}

export const editMovieService = async (args: Movie, context: any) => {
    const { user } = context;

    let { releaseDate } = args;

    // validate movie schema
    validate(editMovieSchema, args);

    // find movie review
    const movie = await Movies.findOne({where: {
        id: args.id,
        userId: user.id
    }});

    if (!movie) {
        throw new Error(errorConstants.MOVIE_DOES_NOT_EXIST);
    }

    let date = new Date();

    if (releaseDate) date = new Date(releaseDate);
   
    // update movie
    await Movies.update({name: args.name, description: args.description, director: args.director, releaseDate: date}, { where: { id: args.id }, returning: true });

    return { success: true, message: 'successefully edited' };
}

export const deletMovieService = async ({ id }: {id: number}, context: any) => {
    const { user } = context;

    // validate schema
    validate(deleteMovieSchema, {id});

    // find movie
    const movie = await Movies.findOne({where: {
        id,
        userId: user.id
    }});

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