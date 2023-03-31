import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { GraphQLError } from 'graphql';

import { typeDefs } from './schema/typeDefs';
import { resolvers } from './schema/resolvers';
import * as db from "./db";
import { validateToken } from '../lib/jwt';
import { tokenType } from './schema/types';

interface MyContext {
    user: tokenType;
  }
  

const run = async () => {
    // connection with postgresql
    db.connect();
    db.sequelize.sync();


    // The ApolloServer constructor requires two parameters: your schema
    // definition and your set of resolvers.
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        
    });
    
    // Passing an ApolloServer instance to the `startStandaloneServer` function:
    //  1. creates an Express app
    //  2. installs your ApolloServer instance as middleware
    //  3. prepares your app to handle incoming requests
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
        // context: async ({ req }) => {

        //     console.log('req--->>>', req);
        //     // get the user token from the headers
        //     const token = req.headers.authorization || '';
        
        //     // try to retrieve a user with the token
        //     const user = await validateToken(token);
        //     console.log('user', user);
        
        //     // optionally block the user
        //     // we could also check user roles/permissions here
        //     if (!user)
        //       // throwing a `GraphQLError` here allows us to specify an HTTP status code,
        //       // standard `Error`s will have a 500 status code by default
        //       throw new GraphQLError('User is not authenticated', {
        //         extensions: {
        //           code: 'UNAUTHENTICATED',
        //           http: { status: 401 },
        //         },
        //       });
        
        //     // add the user to the context
        //     const context = { user };
        //     console.log('Context:', context);
        //     return context;
        //   },
    });
    
    console.log(`🚀  Server ready at: ${url}`);
}

run();