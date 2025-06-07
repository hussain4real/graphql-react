import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// db
import db from './_db.js';

// types
import { typeDefs } from './schema.js';

// Define interfaces for type safety
interface Game {
    id: string;
    title: string;
    platform: string[];
}

interface Review {
    id: string;
    rating: number;
    content: string;
    game_id: string;
    author_id: string;
}
interface Author {
    id: string;
    name: string;
    verified: boolean;
    reviews?: Review[];
}

// resolvers
const resolvers = {
    Query: {
        games: () => {
            return db.games
        },
        game: (_: any, args: { id: string }) => {
            return db.games.find(game => game.id === args.id);
        },
        authors: () => {
            return db.authors
        },
        author: (_: any, args: { id: string }) => {
            return db.authors.find(author => author.id === args.id);
        },
        reviews: () => {
            return db.reviews
        },
        review: (_: any, args: { id: string }) => {
            return db.reviews.find(review => review.id === args.id);
        }
    },
    Game: {
        reviews: (parent: Game) => {
            return db.reviews.filter(review => review.game_id === parent.id);
        }
    },
    Author: {
        reviews: (parent: Author) => {
            return db.reviews.filter(review => review.author_id === parent.id);
        }
    },
    Review: {
        author: (parent: Review) => {
            return db.authors.find(author => author.id === parent.author_id);
        }
        ,
        game: (parent: Review) => {
            return db.games.find(game => game.id === parent.game_id);
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