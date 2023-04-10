import * as jwt from "jsonwebtoken";
import { errorConstants } from "../constants/errorConstants";
import { PrismaClient } from '@prisma/client';

// secret key to be added in env file
const SECRET_KEY = "SECRET_KEY";

/**
 * get jwt token
 */
export const getToken = ({id, email}: {id: number, email: string}): string => {
    // create a JWT token with user's ID and email
    return jwt.sign({id, email}, SECRET_KEY);
}

/**
 * validate token
 * @param token 
 * @returns decoded token
 */
export const validateToken = async (token: string, prisma: PrismaClient): Promise<any> => {
    try {
      if (!token || token == '') {
        return null;
      }

      token = token.split(' ')[1];
      
      // decode token
      const decoded = await jwt.verify(token, SECRET_KEY) as { id: number; email: string };
    
      // check for the decoded id or email
      if (!decoded.id || !decoded.email) {
        throw new Error('User is not authenticated');
      }

      const user = await prisma.users.findFirst({
        where: {
          email: decoded.email,
          id: decoded.id,
        },
      });

      // if user not found
      if (!user) throw new Error('You must be logged in')
    
      return { id: decoded.id, email: decoded.email };
    } catch (error: any) {
      const errorName = error.name == "TokenExpiredError"
                ? errorConstants.TOKEN_IS_EXPIRED
                : errorConstants.AUTH_TOKEN_IS_INVALID;
                
        throw new Error(errorName);
    }
};