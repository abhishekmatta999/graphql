# Movies App Backend Task

The API is designed and deployed in format of resolvers query and mutation functions.

## Requirements

1. [NodeJS](https://nodejs.org/en/)
2. [Postgre](https://www.npmjs.com/package/mongodb)
3. [Typescript] (https://www.typescriptlang.org/)
4. [Apollo Graphql] (https://www.apollographql.com/)

## Recommended IDE

[Vscode](https://code.visualstudio.com/)

## Structure and Services

The project consists of a top level `package.json` typical of a nodejs project. However the individual resolvers code is in repective `src/resolvers/*` directories.

### Root Structure:

The root project contains shared modules, library and models, with individual directories for each API.

```
--project-root
    |_ .gitignore           // global git ignores
    |_ src                  // contains the resolvers, models
    |_ README.md            // this file
    |_ package.json         // package file. Node modules are global for all services
    |_ lib                  // shared code library items. Reusable with all services ////////
```

### src Structure:

```
--src
    |_ models               // The schema of the project
    |_ schema               // The query, typedefs, resolvers and mutation of the project
    |_ index.ts             // main file of the project
    |_ services             // this is responsible for service layer to communicate with models
|_ db.ts                    // this is responsible for DB connection
    
```

## Building API service

The following steps are required for setup:

1. Install `nodejs`.
2. Install and run `postgre`.
    - create a DB named `movies`
    - Make a user named `postgres`
    - Keep password `hrhk`
3. Clone this git repository and go to root directory.
4. Install model modules: `npm install`

## Running the API

run the command `npm run start`

## Endpoints of the project
BASE_URL=`http://localhost:4000/`

Open the BASE_URL in the browser


## Sample Queries
To fetch the movie list
```
query GetMovies($limit: Int, $offset: Int, $search: String, $filter: Object ) {
  movies(limit: $limit, offset: $offset) {
    count
    movies {
      id
      name
      description
      director
      releaseDate
    }
  }
}
```

To get movie by Id
```
query getMovie($ID: ID!) {
  movie(id: $ID) {
      id
      name
      description
      director
      releaseDate
    
  }
}
```

To fetch Movie reviews list
```
query PaginatedReviews($movieId: Int!, $page: Int!, $perPage: Int!) {
  PaginatedReviews(movieId: $movieId, page: $page, perPage: $perPage) {
    total
    totalPages
    currentPage
    perPage
    reviews {
      id
      userId
      rating
      comment
    }
  }
}
```


## Sample Mutations

To create review for a movie
```
mutation createReview($movieId: Int!, $userId: Int!, $rating: Int!, $comment: String) {
  createReview(movieId: $movieId, userId: $userId, rating: $rating, comment: $comment) {
    id
    movieId
    userId
    rating
    comment
  }
}
```

To delete a movie review
```
mutation DeleteReveiw($id: Int!) {
  deleteReview(id: $id) {
    success
  }
}
```


To login
```
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
```

To signup
```
mutation {
  signUp(username: "JohnDoe", email: "johndoe@example.com", password: "test") {
    id
    username
    email
  }
}
```