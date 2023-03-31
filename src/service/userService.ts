import Users from "../models/users";
import { SignupArgs, userType } from "../schema/types";
import { getToken } from "../../lib/jwt";
import { comparePasswords, createEncryptedHash } from "../../lib/bcrypt";

export const signupUser = async (args: SignupArgs): Promise<any> => {
    const { email, password } = args;
  
    // Find user
    const user = await Users.findOne({
      where: {
        email: email,
      },
    });

    // create hashed password
    const hashedPassword = await createEncryptedHash(password);
  
    if (user) {
      throw new Error('User with this email already exists');
    }
  
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
  
    // Find user by email
    const user = await Users.findOne({ where: { email } }) as any as userType;
  
    // not able to find user
    if (!user) {
      throw new Error('User with this email does not exist');
    }

    // validate passwords
    const isPasswordValid = await comparePasswords(password, user.password);
  
    // if password is not valid, throw error
    if (!isPasswordValid) {
      throw new Error('Invalid login credentials');
    }
  
    // Create a JWT token with user's ID and email
    const token = await getToken(user);
  
    return { token };
}
  

/**
 * const login API 
 * @param args 
 */
export const changePassword = async ({ id, oldPassword, newPassword }: {id: number, oldPassword: string, newPassword: string}) => {
    // Retrieve the user by ID from the database
    const user = await Users.findByPk(id) as any as userType;
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }

    // validate passwords
    const isPasswordValid = await comparePasswords(oldPassword, user.password);

    // if password is not valid, throw error
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }

    // create hashed password
    const hashedPassword = await createEncryptedHash(newPassword);

    // Update the user's password hash in the database
    await Users.update({ password: hashedPassword}, { where: { id }, returning: true });

    return {success: true, message: 'Password updated successfully'};
}
