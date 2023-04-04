import { maxLengthErrorMessage, minLengthErrorMessage, typeErrorMessage } from "../../lib/validator";

export const addMovieReviewSchema = {
    type: "object",
    required: ["movieId", "rating", "comment"],
    properties: {
      movieId: {
        type: "integer",
        errorMessage: {
          type: typeErrorMessage("Movie ID")
        }
      },
      rating: {
        type: "integer",
        minimum: 1,
        maximum: 5,
        errorMessage: {
            type: typeErrorMessage("Rating"),
            minimum: 'Rating should lie from 1 to 5',
            maximum: 'Rating should lie from 1 to 5'
        }
      },
      comment: {
        type: "string",
        minLength: 8,
        maxLength: 100,
        transform: ["trim"],
        errorMessage: {
            type: typeErrorMessage("Comment"),
            minLength: minLengthErrorMessage('Comment', 8),
            maxLength: maxLengthErrorMessage('Comment', 100),
        }
      }
    },
    additionalProperties: false
};

export const editMovieReviewSchema = {
    type: "object",
    required: ["id", "rating", "comment"],
    properties: {
        id: {
            type: 'number', 
            nullable: false,
            errorMessage: {
                type: typeErrorMessage('Id'),
            }
        },
        rating: {
            type: "integer",
            minimum: 1,
            maximum: 5,
            errorMessage: {
                type: typeErrorMessage("Rating"),
                minimum: 'Rating should lie from 1 to 5',
                maximum: 'Rating should lie from 1 to 5'
            }
        },
        comment: {
            type: "string",
            minLength: 8,
            maxLength: 100,
            transform: ["trim"],
            errorMessage: {
                type: typeErrorMessage("Comment"),
                minLength: minLengthErrorMessage('Comment', 8),
                maxLength: maxLengthErrorMessage('Comment', 100),
            }
        }
    },
    additionalProperties: false
};

export const deleteMovieReviewSchema = {
    type: "object",
    required: ["id"],
    properties: {
        id: {
            type: 'number', 
            nullable: false,
            errorMessage: {
                type: typeErrorMessage('Id'),
            }
        }
    },
    additionalProperties: false
};

export const movieReviewListSchema = {
    type: "object",
    required: ["movieId", "page", "perPage"],
    properties: {
        movieId: {
            type: 'number', 
            nullable: false,
            errorMessage: {
                type: typeErrorMessage('Movie Id'),
            }
        },
        page: {
            type: "integer",
            minimum: 1,
            errorMessage: {
                type: typeErrorMessage("page"),
                minimum: 'Page should be greater than 1',
            }
        },

        perPage: {
            type: "integer",
            minimum: 1,
            maximum: 20,
            errorMessage: {
                type: typeErrorMessage("Rating"),
                minimum: 'Per Page should be greater than 1',
                maximum: 'Per page should lie from 1 to 20'
            }
        },
    },
    additionalProperties: false
};