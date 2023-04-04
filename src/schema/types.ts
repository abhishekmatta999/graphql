export interface IMovie {
    id: string;
    name: string;
    description?: string;
    director?: string;
    releaseDate?: string;
}
  
export interface IReview {
    id: number;
    movieId: number;
    userId?: number;
    rating?: number;
    comment?: string;
    createdAt: Date;
}
  
export interface ISignupArgs {
    userName: string;
    email: string;
    password: string;
}

export interface ILoginType {
    email: string;
    password: string;
}

export interface IUserType {
    id: number;
    userName: string;
    email: string;
    password: string;
}

export interface ITokenType {
    id: number;
    email: string;
}

export interface IMovieFilterInput {
    name: String
    director: String
  }