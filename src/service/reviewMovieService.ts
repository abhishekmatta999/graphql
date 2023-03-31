import Movies from "../models/movies";
import Reviews from "../models/reviews";
import Users from "../models/users";
const { Op } = require('sequelize');

export const addMovieReviewService = async ({ movieId, userId, rating, comment }: {movieId: number, userId: number, rating: number, comment: string }) => {

    // find movie
    const movie = await Movies.findByPk(movieId);

    if (!movie) {
        throw new Error(`Invalid movie id ${movieId}`);
    }

    const user = await Users.findByPk(userId);

    if (!user) {
        throw new Error(`Invalid User ${userId}`);
    }

    const review = Reviews.create({ movieId, userId, rating, comment });

    return review || {};
}

export const editReviewService = async ({ id, movieId, userId, rating, comment }: {id: number, movieId: number, userId: number, rating: number, comment: string }) => {

    // find movie review
    const review = await Reviews.findByPk(id);
   
    // if review not present throw error.
    if (!review) {
        throw new Error(`Review with ID ${id} not found.`);
    }

    return review.update({ movieId, userId, rating, comment });
}

export const deletMovieReviewService = async ({ id }: {id: number}) => {
    // find reveiw
    const reveiw = await Reviews.findByPk(id);

    if (!reveiw) {
        throw new Error(`Review with ID ${id} not found. please send the correct id`);
    }

    // delet reveiw
    await reveiw.destroy();

    return { success: true };
}

/**
 * get paginated list of review per movie
 * @param param0 
 * @returns list of review per movie
 */
export const getMovieReviewList = async ({ movieId, page, perPage }: {movieId: number, page: number, perPage: number}) => {
    const startIndex = (page - 1) * perPage;
    // const endIndex = startIndex + perPage;

    const total =  await Reviews.count({
        where: {
            movieId: {
                [Op.eq]: movieId
            }
        }
    });

    const reviews = await Reviews.findAll({
        where: {
            movieId: {
                [Op.eq]: movieId
            }
        },
        limit: perPage, offset: startIndex
    });
    
    // const total = reviewsForMovie.length;
    const totalPages = Math.ceil(total / perPage);
    const currentPage = page;
    return {
        total,
        totalPages,
        currentPage,
        perPage,
        reviews,
    };
}