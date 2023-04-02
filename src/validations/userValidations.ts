import validator from 'validator';

// validate email
export const validateEmail = (email: string): boolean => {
    return validator.isEmail(email);
};

// password validator
export const validatePassWord = (password: string): boolean => {
    // regex for password
    const passwordRegex = '^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$'
    return validator.matches(password, passwordRegex);
}