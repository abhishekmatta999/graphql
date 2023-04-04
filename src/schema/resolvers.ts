import { GraphQLError } from "graphql";
import { addMovieService, deletMovieService, editMovieService, getMovieById, getMoviesList } from "../service/movieService";
import { addMovieReviewService, deletMovieReviewService, editReviewService, getMovieReviewList } from "../service/reviewMovieService";
import { changePassword, loginUser, signupUser } from "../service/userService";
import { Movie } from "./types";

/**
 * validate user id authenticated or not
 */
const validateRequest = (user: any) => {
    if (!user) {    
        // throwing a `GraphQLError` here allows us to specify an HTTP status code,
    // standard `Error`s will have a 500 status code by default
    throw new GraphQLError('User is not authenticated', {
        extensions: {
          code: 'UNAUTHENTICATED',
          http: { status: 401 },
        },
      });
    }
}

// Provide resolver functions for your schema fields
export const resolvers = {
    Mutation: {
        // create a new movie
        addMovie: async (parent: any, ctx: Movie, context: any) => {
            // validate req
            validateRequest(context.user);

            return addMovieService(ctx, context);
        },

        // edit movie
        editMovie: async (parent: any, ctx: Movie, context: any) => {
            // validate req
            validateRequest(context.user);
            return editMovieService(ctx, context);
        },

        // delete movie
        deleteMovie: async (parent: any, ctx: any, context: any) => {
            // validate req
            validateRequest(context.user);
            return deletMovieService(ctx, context);
        },

        // create review
        createReview: (parent: any, args: any, context: any) => {
            // validate req
            validateRequest(context.user);
            return addMovieReviewService(args);
        },
      
        // update review
        updateReview: async (parent: any, args: any, context: any) => {
            // validate req
            validateRequest(context.user);
            return editReviewService(args, context);
        },
      
        // delete review
        deleteReview: async (parent: any, { id }: {id: number}, context: any) => {
            // validate req
            validateRequest(context.user);
            return deletMovieReviewService({ id }, context);
        },

        // user signup
        signUp: async (parent: any, ctx: any, context: any) => {
            return signupUser(ctx);
        },

        // user login
        login: async (parent: any, ctx: any, context: any) => {
            return loginUser(ctx);
        },


        // user change password
        changePassword: async (parent: any, ctx: any, context: any) => {
            // validate req
            validateRequest(context.user);
            return changePassword(ctx, context);
        },
    },
    Query: {

        // fetch movies list(paginated)
        movies: async (parent: any, args: any, context: any) => {
            // validate req
            validateRequest(context.user);
            return getMoviesList(args); // return the paginated movie list with the total count
        },

        // fetch movie by id
        movie: async (parent: any, { id }: { id: number }, context: any) => {
            // validate req
            validateRequest(context.user);
            return getMovieById({ id });
        },


        // paginated reveiw list for movie
        PaginatedReviews: async (parent: any, args: any, context: any) => {
            // validate req
            validateRequest(context.user);
            return getMovieReviewList(args, context);
        },
    }
};
