import * as bcrypt from 'bcrypt';

/**
 * compare passwords
 * @param password plain text password
 * @param hashedPassword hashed password
 * @returns 
 */
export const comparePasswords = async (password: string, hashedPassword: string): Promise<boolean>  => {
    const isValidate = await bcrypt.compare(password, hashedPassword);

    return isValidate
}

export const createEncryptedHash = async (password: string) => {
    // Define the number of salt rounds for bcrypt to use
    const saltRounds = 10;

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return hashedPassword;
}