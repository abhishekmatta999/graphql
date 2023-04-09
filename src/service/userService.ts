import { ISignupArgs, IUserType } from "../schema/types";
import { getToken } from "../../lib/jwt-helper";
import { comparePasswords, createEncryptedHash } from "../../lib/bcrypt-helper";
import { errorConstants } from "../../constants/errorConstants";
import { changePasswordSchema, loginSchema, signupSchema } from "../validations/userSchemaValidation";
import { validate } from "../../lib/validator";


export const signupUser = async (args: ISignupArgs, context: any): Promise<any> => {
  const { prisma } = context;

  const { email, password } = args;

  // validate schema
  validate(signupSchema, args);

  // Find user
  const user = await prisma.users.findUnique({
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
  const createdUser = await prisma.users.create({ data: { ...args, password: hashedPassword } });

  // Remove password from user object
  const { password: _, ...userWithoutPassword } = createdUser;

  return userWithoutPassword;
};


/**
 * const login API 
 * @param args 
 */
export const loginUser = async (args: { email: string, password: string }, context: any): Promise<{ token: string }> => {
  const { prisma } = context;

  const { email, password } = args;

  // validate schema
  validate(loginSchema, args);

  // Find user by email
  const user = await prisma.users.findUnique({ where: { email } }) as any as IUserType;

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
  const { user, prisma } = context;

  // validate schema
  validate(changePasswordSchema, {oldPassword, newPassword});

  // Retrieve the user by ID from the database
  const userProfile = await prisma.users.findUnique({ where: { id: user.id } }) as any as IUserType;
  if (!userProfile) {
    throw new Error(`User with ID ${user.id} not found`);
  }

  // validate passwords
  const isPasswordValid = await comparePasswords(oldPassword, userProfile.password);

  // if password is not valid, throw error
  if (!isPasswordValid) {
    throw new Error(errorConstants.INCORRECT_OLD_PASSWORD);
  }

  if (oldPassword === newPassword) throw new Error(errorConstants.OLD_PASSWORD_AND_NEW_PASSWORD_SHOULD_NOT_BE_SAME)

  // create hashed password
  const hashedPassword = await createEncryptedHash(newPassword);

  // Update the user's password hash in the database
  await prisma.users.update({ where: { id: user.id }, data: { password: hashedPassword } });

  return {success: true, message: 'Password updated successfully'};
}
