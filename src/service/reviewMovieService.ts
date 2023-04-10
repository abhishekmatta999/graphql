import { errorConstants } from "../../constants/errorConstants";
import { validate } from "../../lib/validator";
import { addMovieReviewSchema, deleteMovieReviewSchema, editMovieReviewSchema, movieReviewListSchema } from "../validations/movieReviewSchemaValidations";

export const addMovieReviewService = async ({ movieId, rating, comment }: { movieId: number, rating: number, comment: string }, context: any) => {

    const { user, prisma } = context;

    // validate schema
    validate(addMovieReviewSchema, { movieId, rating, comment });

    // find movie
    const movie = await prisma.movies.findUnique({
      where: { id: movieId }
    });

    if (!movie) {
      throw new Error(errorConstants.MOVIE_DOES_NOT_EXIST);
    }

    const userProfile = await prisma.users.findUnique({
      where: { id: user.id }
    });

    if (!userProfile) {
      throw new Error(errorConstants.USER_NOT_FOUND);
    }

    const review = await prisma.reviews.create({
      data: {
        movieId,
        userId: user.id,
        rating,
        comment
      }
    });

    return review || {};
}

export const editReviewService = async ({ id, rating, comment }: { id: number, rating: number, comment: string }, context: any) => {

    const { user, prisma } = context;

    // validate schema
    validate(editMovieReviewSchema, { id, rating, comment });

    // find movie review
    const review = await prisma.reviews.findFirst({
      where: {
        id,
        userId: user.id
      }
    });

    // if review not present throw error.
    if (!review) {
      throw new Error(errorConstants.REVEIW_DOES_NOT_EXIST);
    }

    return prisma.reviews.update({
      where: { id },
      data: { rating, comment }
    });
}

export const deletMovieReviewService = async ({ id }: { id: number }, context: any) => {
    const { user, prisma } = context;

    // validate schema
    validate(deleteMovieReviewSchema, { id });

    // find movie review
    const review = await prisma.reviews.findFirst({
      where: {
        id,
        userId: user.id
      }
    });

    // if review not present throw error.
    if (!review) {
      throw new Error(errorConstants.REVEIW_DOES_NOT_EXIST);
    }

    // delete review
    await prisma.reviews.delete({ where: { id } });

    return { success: true };
}

/**
 * get paginated list of review per movie
 * @param param0 
 * @returns list of review per movie
 */
export const getMovieReviewList = async ({ movieId, page, perPage }: {movieId: number, page: number, perPage: number}, context: any) => {
  const { user, prisma } = context;

  // validate schema
  validate(movieReviewListSchema, { movieId, page, perPage });

  const startIndex = (page - 1) * perPage;

  const userReview = await prisma.reviews.findFirst({
    where: {
      movieId: movieId,
      userId: user?.id || null // set to null if user is not logged in
    },
    skip: startIndex
  }) ?? {};

  const whereNot = userReview?.id ? { id: userReview?.id } : {};

  let remainingReviews = await prisma.reviews.findMany({
    where: {
      movieId: movieId,
      NOT: whereNot
    },
    take: userReview?.id ? perPage - 1 : perPage,
    skip: startIndex
  });

  if (userReview && userReview?.id) {
    // Add user's review to beginning of reviews array
    remainingReviews.unshift(userReview);
  }

  const total = await prisma.reviews.count({
    where: {
      movieId: movieId
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