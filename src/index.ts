import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema/typeDefs';
import { resolvers } from './schema/resolvers';
import { validateToken } from '../lib/jwt-helper';
import { ITokenType } from './schema/types';
import { PrismaClient } from '@prisma/client';

interface UserContext {
    user: ITokenType;
    prisma: PrismaClient;
}

const prisma = new PrismaClient();

const run = async () => {

    // The ApolloServer constructor requires two parameters: your schema
    // definition and your set of resolvers.
    const server = new ApolloServer<UserContext>({
        typeDefs,
        resolvers,
        formatError: (err) => {
            // only return the error message
            return { message: err.message }
        },
    });
    
    // Passing an ApolloServer instance to the `startStandaloneServer` function:
    //  1. creates an Express app
    //  2. installs your ApolloServer instance as middleware
    //  3. prepares your app to handle incoming requests
    const { url } = await startStandaloneServer(server, {
        listen: { port: parseInt(process.env.PORT ?? '4000') },
        context: async ({ req }) => {
            // get the user token from the headers
            const token = req.headers.authorization || '';
        
            // try to retrieve a user with the token
            const user = await validateToken(token, prisma);

            // add the user to the context
            const context = { 
                user: user || null,
                prisma
            };
            return context;
        },
    });
    
    console.log(`🚀  Server ready at: ${url}`);
}

run();