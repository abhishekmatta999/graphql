import { maxLengthErrorMessage, minLengthErrorMessage, typeErrorMessage } from "../../lib/validator";

export const addMovieSchema = {
    type: "object",
    properties: {
      name: {
        type: "string", 
        minLength: 3, 
        maxLength: 50,
        errorMessage: {
            type: typeErrorMessage('Name'),
            minLength: minLengthErrorMessage('Name', 3),
            maxLength: maxLengthErrorMessage('Name', 50),
        }
    },
      description: {
            type: "string", 
            minLength: 8, 
            maxLength: 100, 
            errorMessage: {
                type: typeErrorMessage('Description'),
                minLength: minLengthErrorMessage('Description', 8),
                maxLength: maxLengthErrorMessage('Description', 100),
            }
        },
        director: {
            type: "string", 
            minLength: 3,
            maxLength: 100,
            errorMessage: {
                type: typeErrorMessage('Director'),
                minLength: minLengthErrorMessage('Director', 3),
                maxLength: maxLengthErrorMessage('Director', 100),
            }
        },
        releaseDate: {
            type: "string", 
            format: "date",
        },
    },
    required: ["name", "description", "director", "releaseDate"],
    additionalProperties: false,
};

export const editMovieSchema = {
    type: "object",
    properties: {
        id: {
            type: 'number', 
            nullable: false,
            errorMessage: {
                type: typeErrorMessage('Id'),
            }
        },
        name: {
            type: "string", 
            minLength: 3, 
            maxLength: 50,
            errorMessage: {
                type: typeErrorMessage('Name'),
                minLength: minLengthErrorMessage('Name', 3),
                maxLength: maxLengthErrorMessage('Name', 50),
            }
        },
          description: {
                type: "string", 
                minLength: 8, 
                maxLength: 100, 
                errorMessage: {
                    type: typeErrorMessage('Description'),
                    minLength: minLengthErrorMessage('Description', 8),
                    maxLength: maxLengthErrorMessage('Description', 100),
                }
            },
            director: {
                type: "string", 
                minLength: 3,
                maxLength: 100,
                errorMessage: {
                    type: typeErrorMessage('Director'),
                    minLength: minLengthErrorMessage('Director', 3),
                    maxLength: maxLengthErrorMessage('Director', 100),
                }
            },
            releaseDate: {
                type: "string", 
                format: "date",
            },
    },
    required: ["name", "description", "director", "releaseDate", 'id'],
    additionalProperties: false,
};

export const deleteMovieSchema = {
    type: "object",
    properties: {
        id: {
            type: 'number', 
            nullable: false,
            errorMessage: {
                type: typeErrorMessage('Id'),
            }
        },
    },
    required: ['id'],
    additionalProperties: false,
};


  

