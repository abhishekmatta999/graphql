import { addMovieService, deletMovieService, editMovieService, getMovieById, getMoviesList } from "../service/movieService";
import { addMovieReviewService, deletMovieReviewService, editReviewService, getMovieReviewList } from "../service/reviewMovieService";
import { changePassword, loginUser, signupUser } from "../service/userService";
import { Movie } from "./types";

// Provide resolver functions for your schema fields
export const resolvers = {
    Mutation: {
        // create a new movie
        addMovie: async (parent: any, ctx: Movie) => {
            return addMovieService(ctx);
        },

        // edit movie
        editMovie: async (parent: any, ctx: Movie) => {
            return editMovieService(ctx);
        },

        // delete movie
        deleteMovie: async (parent: any, ctx: any) => {
            return deletMovieService(ctx);
        },

        // create review
        createReview: (parent: any, args: any) => {
            return addMovieReviewService(args);
        },
      
        // update review
        updateReview: async (parent: any, args: any) => {
            return editReviewService(args);
        },
      
        // delete review
        deleteReview: async (parent: any, { id }: {id: number}) => {
            return deletMovieReviewService({ id });
        },

        // user signup
        signUp: async (parent: any, ctx: any) => {
            return signupUser(ctx);
        },

        // user login
        login: async (parent: any, ctx: any) => {
            return loginUser(ctx);
        },


        // user change password
        changePassword: async (parent: any, ctx: any) => {
            return changePassword(ctx);
        },
    },
    Query: {

        // fetch movies list(paginated)
        movies: async (parent: any, args: any) => {
            return getMoviesList(args); // return the paginated movie list with the total count
        },

        // fetch movie by id
        movie: async (parent: any, { id }: { id: number }) => {
            return getMovieById({ id });
        },


        // paginated reveiw list for movie
        PaginatedReviews: async (parent: any, args: any) => {
            return getMovieReviewList(args);
        },
    }
};
