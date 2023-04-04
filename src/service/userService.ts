import Users from "../models/users";
import { ISignupArgs, IUserType } from "../schema/types";
import { getToken } from "../../lib/jwt-helper";
import { comparePasswords, createEncryptedHash } from "../../lib/bcrypt-helper";
import { errorConstants } from "../../constants/errorConstants";
import { changePasswordSchema, loginSchema, signupSchema } from "../validations/userSchemaValidation";
import { validate } from "../../lib/validator";

export const signupUser = async (args: ISignupArgs): Promise<any> => {
    const { email, password } = args;

    // validate schema
    validate(signupSchema, args);
  
    // Find user
    const user = await Users.findOne({
      where: {
        email: email,
      },
    });

    if (user) {
      throw new Error('User with this email already exists');
    }

    // create hashed password
    const hashedPassword = await createEncryptedHash(password);
  
    // Create user
    const createdUser = await Users.create({ ...args, password: hashedPassword });

    // Remove password from user object
    const { password: _, ...userWithoutPassword } = createdUser.toJSON();
    return userWithoutPassword;
};


/**
 * const login API 
 * @param args 
 */
export const loginUser = async (args: { email: string, password: string }): Promise<{ token: string }> => {
    const { email, password } = args;

    // validate schema
    validate(loginSchema, args);
  
    // Find user by email
    const user = await Users.findOne({ where: { email } }) as any as IUserType;
  
    // not able to find user
    if (!user) {
      throw new Error(errorConstants.USER_WITH_EMAIL_NOT_FOUND);
    }

    // validate passwords
    const isPasswordValid = await comparePasswords(password, user.password);
  
    // if password is not valid, throw error
    if (!isPasswordValid) {
      throw new Error(errorConstants.INVALID_LOGIN_CREDENTIALS);
    }
  
    // Create a JWT token with user's ID and email
    const token = await getToken(user);
  
    return { token };
}
  

/**
 * const login API 
 * @param args 
 */
export const changePassword = async ({ oldPassword, newPassword }: {oldPassword: string, newPassword: string}, context: any) => {
    const { user } = context;

    // validate schema
    validate(changePasswordSchema, {oldPassword, newPassword});
    
    // Retrieve the user by ID from the database
    const userProfile = await Users.findByPk(user.id) as any as IUserType;
    if (!userProfile) {
      throw new Error(`User with ID ${user.id} not found`);
    }

    // validate passwords
    const isPasswordValid = await comparePasswords(oldPassword, userProfile.password);

    // if password is not valid, throw error
    if (!isPasswordValid) {
      throw new Error(errorConstants.INVALID_PASSWORD);
    }

    // create hashed password
    const hashedPassword = await createEncryptedHash(newPassword);

    // Update the user's password hash in the database
    await Users.update({ password: hashedPassword}, { where: { id: user.id }, returning: true });

    return {success: true, message: 'Password updated successfully'};
}
