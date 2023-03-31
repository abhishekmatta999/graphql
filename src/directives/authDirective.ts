import { GraphQLDirective, DirectiveLocation, defaultFieldResolver } from 'graphql';

class AuthDirective extends GraphQLDirective {
  constructor() {
    super({
      name: 'auth',
      locations: [DirectiveLocation.FIELD_DEFINITION],
    });
  }

  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = async function (...args) {
      const [, , context] = args;
      const { user } = context;

      if (!user) {
        throw new Error('User is not authenticated');
      }

      return resolve.apply(this, args);
    };
  }
}

export const schemaDirectives = {
  auth: AuthDirective,
};