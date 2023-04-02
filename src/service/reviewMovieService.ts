import { errorConstants } from "../../constants/errorConstants";
import Movies from "../models/movies";
import Reviews from "../models/reviews";
import Users from "../models/users";
const { Op } = require('sequelize');

export const addMovieReviewService = async ({ movieId, userId, rating, comment }: {movieId: number, userId: number, rating: number, comment: string }) => {

    // find movie
    const movie = await Movies.findByPk(movieId);

    if (!movie) {
        throw new Error(errorConstants.MOVIE_DOES_NOT_EXIST);
    }

    const user = await Users.findByPk(userId);

    if (!user) {
        throw new Error(errorConstants.USER_NOT_FOUND);
    }

    const review = Reviews.create({ movieId, userId, rating, comment });

    return review || {};
}

export const editReviewService = async ({ id, movieId, userId, rating, comment }: {id: number, movieId: number, userId: number, rating: number, comment: string }, context: any) => {

    const { user } = context;

    // find movie review
    const review = await Reviews.findOne({where: {
        id,
        userId: user.id
    }});
   
    // if review not present throw error.
    if (!review) {
        throw new Error(errorConstants.REVEIW_DOES_NOT_EXIST);
    }

    return review.update({ movieId, userId, rating, comment });
}

export const deletMovieReviewService = async ({ id }: {id: number}, context: any) => {
    const { user } = context;

    // find movie review
    const review = await Reviews.findOne({where: {
        id,
        userId: user.id
    }});

    // if review not present throw error.
    if (!review) {
        throw new Error(errorConstants.REVEIW_DOES_NOT_EXIST);
    }

    // delet review
    await review.destroy();

    return { success: true };
}

/**
 * get paginated list of review per movie
 * @param param0 
 * @returns list of review per movie
 */
export const getMovieReviewList = async ({ movieId, page, perPage }: {movieId: number, page: number, perPage: number}, context: any) => {
  const { user } = context;
  const startIndex = (page - 1) * perPage;

  const userReview = await Reviews.findOne({
    where: {
      movieId: {
        [Op.eq]: movieId
      },
      userId: {
        [Op.eq]: user?.id || null // set to null if user is not logged in
      }
    },
    offset: startIndex
  });

  let remainingReviews = await Reviews.findAll({
    where: {
      movieId: {
        [Op.eq]: movieId
      },
      userId: {
        [Op.ne]: user?.id || null // exclude user's review from remaining reviews
      }
    },
    limit: perPage,
    offset: startIndex
  });

  if (userReview) {
    // Add user's review to beginning of reviews array
    remainingReviews.unshift(userReview);
  }

  const total = await Reviews.count({
    where: {
      movieId: {
        [Op.eq]: movieId
      }
    }
  });

  const totalPages = Math.ceil(total / perPage);
  const currentPage = page;

  return {
    total,
    totalPages,
    currentPage,
    perPage,
    reviews: remainingReviews
  };
};