import { GraphQLError } from "graphql";
import * as jwt from "jsonwebtoken";
import { errorConstants } from "../constants/errorConstants";
import { userType } from "../src/schema/types";

// secret key to be added in env file
const SECRET_KEY = "SECRET_KEY";

/**
 * get jwt token
 */
export const getToken = (user: userType): string => {
    const {id, email} = user;

    // create a JWT token with user's ID and email
    return jwt.sign({id, email}, SECRET_KEY);
}

/**
 * validate token
 * @param token 
 * @returns decoded token
 */
export const validateToken = async (token: string): Promise<any> => {
    try {
      if (!token) {
        return null;
      }
      
      // decode token
      const decoded = await jwt.verify(token, SECRET_KEY) as { id: number; email: string };
    
      // check for the decoded id or email
      if (!decoded.id || !decoded.email) {
        throw new GraphQLError('User is not authenticated', {
          extensions: {
          code: 'UNAUTHENTICATED',
          http: { status: 401 },
          },
        });
      }
    
      return { id: decoded.id, email: decoded.email };
    } catch (error: any) {
      const errorName = error.name == "TokenExpiredError"
                ? errorConstants.TOKEN_IS_EXPIRED
                : errorConstants.AUTH_TOKEN_IS_INVALID;
                
        throw new Error(errorName);
    }
};