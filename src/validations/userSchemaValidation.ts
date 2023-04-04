import { maxLengthErrorMessage, minLengthErrorMessage, patternErrorMessage, typeErrorMessage } from "../../lib/validator";

export const signupSchema = {
    type: "object",
    properties: {
      firstName: {
        type: "string", 
        minLength: 3, 
        maxLength: 50,
        errorMessage: {
            type: typeErrorMessage('First name'),
            minLength: minLengthErrorMessage('First name', 3),
            maxLength: maxLengthErrorMessage('First name', 50),
        }
      },
      lastName: {
        type: "string", 
        minLength: 3, 
        maxLength: 50, 
        errorMessage: {
            type: typeErrorMessage('Last name'),
            minLength: minLengthErrorMessage('Last name', 3),
            maxLength: maxLengthErrorMessage('Last name', 50),
        }
      },
      username: {
        type: "string", 
        minLength: 3,
        maxLength: 50,
        errorMessage: {
            type: typeErrorMessage('Username'),
            minLength: minLengthErrorMessage('Username', 3),
            maxLength: maxLengthErrorMessage('Username', 50),
        }
      },
      email: {
        type: "string", 
        format: "email",
        errorMessage: {
            type: typeErrorMessage('Email'),
            format: patternErrorMessage('Email'),
        }
      },
      password: {
        type: "string", 
        minLength: 8,
        maxLength: 100,
        pattern: "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).{8,}$",
        errorMessage: {
            type: typeErrorMessage('Password'),
            minLength: minLengthErrorMessage('Password', 8),
            maxLength: maxLengthErrorMessage('Password', 100),
            pattern: patternErrorMessage('Password')
        }
      },
    },
    required: ["firstName", "lastName", "username", "email", "password"],
    additionalProperties: false,
};

export const loginSchema = {
    type: "object",
    properties: {
      email: {
        type: "string", 
        format: "email",
        errorMessage: {
            type: typeErrorMessage('Email'),
            format: patternErrorMessage('Email'),
        }
      },
      password: {
        type: "string", 
        minLength: 8,
        maxLength: 100,
        pattern: "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).{8,}$",
        errorMessage: {
            type: typeErrorMessage('Password'),
            minLength: minLengthErrorMessage('Password', 8),
            maxLength: maxLengthErrorMessage('Password', 100),
            pattern: patternErrorMessage('Password')
        }
      },
    },
    required: ["email", "password"],
    additionalProperties: false,
};

export const changePasswordSchema = {
  type: "object",
  properties: {
    id: {
      type: 'number', 
      nullable: false,
      errorMessage: {
          type: typeErrorMessage('Id'),
      }
  },
    oldPassword: {
      type: "string", 
      minLength: 8,
      maxLength: 100,
      pattern: "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).{8,}$",
      errorMessage: {
          type: typeErrorMessage('oldPassword'),
          minLength: minLengthErrorMessage('oldPassword', 8),
          maxLength: maxLengthErrorMessage('oldPassword', 100),
          pattern: patternErrorMessage('oldPassword')
      }
    },
    newPassword: {
      type: "string", 
      minLength: 8,
      maxLength: 100,
      pattern: "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).{8,}$",
      errorMessage: {
          type: typeErrorMessage('newPassword'),
          minLength: minLengthErrorMessage('newPassword', 8),
          maxLength: maxLengthErrorMessage('newPassword', 100),
          pattern: patternErrorMessage('newPassword')
      }
    },
  },
  required: ["newPassword", "oldPassword", "id"],
  additionalProperties: false,
};