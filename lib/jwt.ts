import * as jwt from "jsonwebtoken";
import { tokenType, userType } from "../src/schema/types";

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
export const validateToken = async (token: string): Promise<tokenType> => {
    console.log('token', token);
    
    // decode token
    const decoded = await jwt.verify(token, SECRET_KEY) as { id: number; email: string };

    console.log('decorded', decoded);
  
    if (!decoded.id || !decoded.email) {
      throw new Error('Invalid token');
    }
  
    return { id: decoded.id, email: decoded.email };
};