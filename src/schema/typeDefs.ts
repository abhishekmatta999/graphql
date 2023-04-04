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
    firstName: String!
    lastName: String!
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
    movie(id: Int!): Movie
    reviews(movieId: Int!, page: Int!, perPage: Int!): PaginatedReview!
  }

  type Mutation {
    addMovie(name: String!, description: String!, director: String!, releaseDate: String!): Movie,
    editMovie(id: Int!, name: String, description: String, director: String, releaseDate: String): editResponse
    deleteMovie(id: Int!): DeleteResponse
    
    createReview(movieId: Int!, rating: Int!, comment: String): Review!
    updateReview(id: Int!, rating: Int, comment: String): Review!
    deleteReview(id: Int!): DeleteResponse


    signUp(username: String!, email: String!, password: String!, firstName: String!, lastName: String!): User,
    login(email: String!, password: String!): Token,
    changePassword(oldPassword: String!, newPassword: String!): editResponse
  }
`;
 