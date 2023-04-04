import { errorConstants } from "../../constants/errorConstants";
import { validate } from "../../lib/validator";
import Movies from "../models/movies";
import Reviews from "../models/reviews";
import Users from "../models/users";
import { addMovieReviewSchema, deleteMovieReviewSchema, editMovieReviewSchema, movieReviewListSchema } from "../validations/movieReviewSchemaValidations";
const { Op } = require('sequelize');

export const addMovieReviewService = async ({ movieId, rating, comment }: {movieId: number, rating: number, comment: string }, context: any) => {

    const { user } = context;

    // validate schema
    validate(addMovieReviewSchema, {movieId, rating, comment});

    // find movie
    const movie = await Movies.findByPk(movieId);

    if (!movie) {
        throw new Error(errorConstants.MOVIE_DOES_NOT_EXIST);
    }

    const userProfile = await Users.findByPk(user.id);

    if (!userProfile) {
        throw new Error(errorConstants.USER_NOT_FOUND);
    }

    const review = Reviews.create({ movieId, userId: user.id, rating, comment });

    return review || {};
}

export const editReviewService = async ({ id, rating, comment }: {id: number, rating: number, comment: string }, context: any) => {

    const { user } = context;

    // validate schema
    validate(editMovieReviewSchema, { id, rating, comment });

    // find movie review
    const review = await Reviews.findOne({where: {
        id,
        userId: user.id
    }});
   
    // if review not present throw error.
    if (!review) {
        throw new Error(errorConstants.REVEIW_DOES_NOT_EXIST);
    }

    return review.update({ rating, comment });
}

export const deletMovieReviewService = async ({ id }: {id: number}, context: any) => {
    const { user } = context;

    // validate schema
    validate(deleteMovieReviewSchema, { id});

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

  // validate schema
  validate(movieReviewListSchema, { movieId, page, perPage });
  
  const startIndex = (page - 1) * perPage;

  const userReview: any = await Reviews.findOne({
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
      id: {
        [Op.ne]: userReview?.id || null // exclude user's review from remaining reviews
      }
    },
    limit: (userReview) ? perPage - 1 : perPage,
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