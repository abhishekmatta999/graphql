export interface Movie {
    id: string;
    name: string;
    description?: string;
    director?: string;
    releaseDate?: string;
}
  
export interface Review {
    id: number;
    movieId: number;
    userId?: number;
    rating?: number;
    comment?: string;
    createdAt: Date;
}
  
export interface SignupArgs {
    userName: string;
    email: string;
    password: string;
}

export interface loginType {
    email: string;
    password: string;
}

export interface userType {
    id: number;
    userName: string;
    email: string;
    password: string;
}

export interface tokenType {
    id: number;
    email: string;
}

export interface MovieFilterInput {
    name: String
    director: String
  }