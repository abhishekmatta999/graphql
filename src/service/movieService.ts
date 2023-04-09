import { errorConstants } from "../../constants/errorConstants";
import { validate } from "../../lib/validator";
import { IMovie } from "../schema/types";
import { addMovieSchema, deleteMovieSchema, editMovieSchema } from "../validations/movieSchemaValidations";

export const addMovieService = async (args: IMovie, context: any) => {
    const { user, prisma } = context;
  
    let { releaseDate } = args;
  
    // validate movie schema
    validate(addMovieSchema, args);
  
    let date = new Date();
  
    if (releaseDate) date = new Date(releaseDate);
  
    const movie = await prisma.movies.create({
      data: {
        ...args,
        releaseDate: date,
        userId: user.id,
      },
    });
  
    return movie || {};
};

export const editMovieService = async (args: IMovie, context: any) => {
    const { user, prisma } = context;

    let { releaseDate } = args;

    // validate movie schema
    validate(editMovieSchema, args);

    // find movie review
    const movie = await prisma.movies.findFirst({
        where: {
        id: args.id,
        userId: user.id,
        },
    });

    if (!movie) {
        throw new Error(errorConstants.MOVIE_DOES_NOT_EXIST);
    }

    let date = new Date();

    if (releaseDate) date = new Date(releaseDate);

    // update movie
    await prisma.movies.update({
        where: { id: args.id },
        data: {
        name: args.name,
        description: args.description,
        director: args.director,
        releaseDate: date,
        },
    });

    return { success: true, message: 'successfully edited' };
};

export const deletMovieService = async ({ id }: { id: number }, context: any) => {
    const { user, prisma } = context;

    // validate schema
    validate(deleteMovieSchema, { id });

    // find movie
    const movie = await prisma.movies.findFirst({
        where: {
            id,
            userId: user.id,
        },
    });

    if (!movie) {
        throw new Error(errorConstants.MOVIE_DOES_NOT_EXIST);
    }

    // delete reviews
    await prisma.reviews.deleteMany({
        where: {
        movieId: id,
        },
    });

    // delete movie
    await prisma.movies.delete({
        where: { id },
    });

    return { success: true };
};

export const getMoviesList = async ({ limit, offset, search }: { limit: number; offset: number; search: string }, context: any   ) => {
    const { prisma } = context;

    // where object to filter the movies
    const where = search
        ? {
            OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
            ],
        }
        : {};

    // fetch total count of movies
    const totalCount = await prisma.movies.count({ where }); // get the total count of movies

    const movies = await prisma.movies.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy: [{ createdAt: 'desc' }],
    }); // fetch the movies with the specified limit and offset

    return { count: totalCount, movies }; // return the paginated movie list with the total count
};

export const getMovieById = async ({ id }: { id: number }, context: any) => {
    const { prisma } = context;

    const movie = await prisma.movies.findUnique({
        where: { id },
    });

    if (!movie) {
        throw new Error(errorConstants.MOVIE_DOES_NOT_EXIST);
    }

    return movie;
};