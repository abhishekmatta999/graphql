export const typeDefs = `

  type Movie {
    id: ID!
    name: String!
    description: String
    director: String
    releaseDate: String
  }

  type User {
    id: Int!
    username: String!
    email: String!
    password: String!
  }

  type MovieList {
    count: Int!
    movies: [Movie!]!
  }

  type Review {
    id: Int!
    movieId: Int!
    userId: Int!
    rating: Int!
    comment: String
  }
  
  type DeleteResponse {
    success: Boolean!
    message: String
  }

  type editResponse {
    success: Boolean!
    message: String
  }


  type PaginatedReview {
    total: Int!
    totalPages: Int!
    currentPage: Int!
    perPage: Int!
    reviews: [Review!]!
  }

  type Token {
    token: String!
  }

  type Query {
    movies(limit: Int = 10, offset: Int = 0, search: String): MovieList,
    movie(id: ID!): Movie
    PaginatedReviews(movieId: Int!, page: Int!, perPage: Int!): PaginatedReview!
  }

  type Mutation {
    addMovie(name: String!, description: String!, director: String!, releaseDate: String!): Movie,
    editMovie(id: ID!, name: String, description: String, director: String, releaseDate: String): editResponse
    deleteMovie(id: ID!): DeleteResponse
    
    createReview(movieId: Int!, userId: Int!, rating: Int!, comment: String): Review!
    updateReview(id: Int!, movieId: Int, userId: Int, rating: Int, comment: String): Review!
    deleteReview(id: Int!): DeleteResponse


    signUp(username: String!, email: String!, password: String!): User,
    login(email: String!, password: String!): Token,
    changePassword(id: Int!, oldPassword: String!, newPassword: String!): editResponse
  }
`;
 