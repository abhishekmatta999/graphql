import * as bcrypt from 'bcrypt';

/**
 * compare passwords
 * @param password plain text password
 * @param hashedPassword hashed password
 * @returns 
 */
export const comparePasswords = async (password: string, hashedPassword: string): Promise<boolean>  => {
    return await bcrypt.compare(password, hashedPassword);
}

export const createEncryptedHash = async (password: string) => {
    // Define the number of salt rounds for bcrypt to use
    const saltRounds = 10;

    // Hash the password using bcrypt
    return await bcrypt.hash(password, saltRounds);
}