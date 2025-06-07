import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// db
import db from './_db.js';

// types
import { typeDefs } from './schema.js';

// resolvers
const resolvers = {
    Query: {
        games: () => {
            return db.games
        },
        reviews: () => {
            return db.reviews
        },
        authors: () => {
            return db.authors
        }
    }
}

// server setup
const server = new ApolloServer({
    // typeDefs 
    typeDefs,
    // resolvers
    resolvers,
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },

});
console.log(`🚀 Server ready at: ${url}`);