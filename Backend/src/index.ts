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

interface AddGameInput {
    title: string;
    platform: string[];
}

// New interface for AddReviewInput
interface AddReviewInput {
    rating: number;
    content: string;
    game_id: string;
    author_id: string;
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
    },
    Mutation: {
        addGame: (_: any, args: { game: AddGameInput }) => {
            const newGame = {
                ...args.game,
                id: String(db.games.length + 1),

            };
            db.games.push(newGame);
            return newGame;
        },
        updateGame: (_: any, args: { id: string, edits: Partial<AddGameInput> }) => {
            db.games = db.games.map(game => {
                if (game.id === args.id) {
                    return {
                        ...game,
                        ...args.edits
                    };
                }
                return game;
            }
            );
            // return the updated game
            return db.games.find(game => game.id === args.id);
        },
        deleteGame: (_: any, args: { id: string }) => {
            // use filter to remove the game with the specified id
            db.games = db.games.filter(game => game.id !== args.id);
            // also remove all reviews associated with the deleted game
            db.reviews = db.reviews.filter(review => review.game_id !== args.id);
            // return the updated list of games
            return db.games;
        },
        // New resolver for addReview
        addReview: (_: any, args: { review: AddReviewInput }) => {
            // console.log('Received addReview mutation with args:', args);
            // console.log('Review data:', args.review);
            
            const newReview = {
                ...args.review,
                id: String(db.reviews.length + 1),
            };
            // console.log('Created new review:', newReview);
            
            db.reviews.push(newReview);
            // console.log('Updated reviews array:', db.reviews);
            
            return newReview;
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
    context: async ({ req }) => {
        // Add some debugging
        console.log('Received request:', req.method, req.url);
        return {};
    },
});
console.log(`🚀 Server ready at: ${url}`);