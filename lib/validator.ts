import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
require('ajv-errors')(ajv);
require('ajv-keywords')(ajv, 'transform');

export const validate = (schema: Object, body: Object) => {
    //validate
    const validator = ajv.compile(schema) as any;

    // to store the validation status on schema
    const isValid = validator(body);

    // if valid
    if (isValid) return;

    // extract error message
    let message;
    if (validator && validator.errors && validator.errors.length && validator.errors[0].hasOwnProperty("dataPath")) {
      message = `${validator.errors[0].message} at ${validator.errors[0].dataPath}`;
    } else {
      message = validator.errors[0].message;
    }

    throw new Error(`Invalid Input: ${message || ''}`);
};

// min length error message
export const minLengthErrorMessage = (field: string, min: number) => `${field} must have at least ${min} characters`;

// max length error message
export const maxLengthErrorMessage = (field: string, max: number) => `${field} must have at most ${max} characters`;

// type error message
export const typeErrorMessage = (field: string) => `${field}: Invalid type format`;

// pattern matching error
export const patternErrorMessage = (field: string) => `${field}: Invalid pattern`;

