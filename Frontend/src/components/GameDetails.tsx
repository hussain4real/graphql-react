import React from 'react';
import { gql, useQuery } from '@apollo/client';
import AddReviewForm from './AddReviewForm'; // Import the new form

const GET_GAME_DETAILS = gql`
  query GetGameDetails($id: ID!) {
    game(id: $id) {
      id
      title
      platform
      reviews {
        id
        rating
        content
        author {
          id
          name
          verified
        }
      }
    }
  }
`;

interface Review {
    id: string;
    rating: number;
    content: string;
    author: Author;
}

interface Author {
    id: string;
    name: string;
    verified: boolean;
}

interface GameDetailsData {
    game: {
        id: string;
        title: string;
        platform: string[];
        reviews: Review[];
    };
}

interface GameDetailsProps {
    gameId: string;
    onBack: () => void;
}

const GameDetails: React.FC<GameDetailsProps> = ({ gameId, onBack }) => {
    const { loading, error, data, refetch } = useQuery<GameDetailsData>(GET_GAME_DETAILS, {
        variables: { id: gameId },
    });

    if (loading) return <p className="text-center py-10">Loading game details...</p>;
    if (error) return <p className="text-center py-10 text-red-500">Error loading game: {error.message}</p>;
    if (!data || !data.game) return <p className="text-center py-10">No game data found.</p>;

    const { game } = data;

    const handleReviewAdded = () => {
        refetch(); // Refetch game details to show the new review
    };

    return (
        <div className="container mx-auto p-4 md:p-8">
            <button
                onClick={onBack}
                className="mb-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
            >
                &larr; Back to Games
            </button>
            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
                <div className="p-6 md:p-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">{game.title}</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                        Platforms: {game.platform.join(', ')}
                    </p>

                    <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4">Reviews ({game.reviews.length})</h2>
                    {game.reviews.length > 0 ? (
                        <ul className="space-y-6">
                            {game.reviews.map(review => (
                                <li key={review.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md shadow">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">By: {review.author.name} {review.author.verified && <span className="text-xs bg-green-200 text-green-800 px-2 py-0.5 rounded-full ml-2">Verified</span>}</h3>
                                        <span
                                            className={`px-3 py-1 text-sm font-semibold rounded-full 
                        ${review.rating >= 4 ? 'bg-green-100 text-green-800' : review.rating >= 2 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}
                      `}
                                        >
                                            Rating: {review.rating}/5
                                        </span>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300">{review.content}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600 dark:text-gray-400">No reviews yet for this game.</p>
                    )}
                </div>
            </div>
            {/* Add the review form below the reviews list */}
            <AddReviewForm gameId={gameId} onReviewAdded={handleReviewAdded} />
        </div>
    );
};

export default GameDetails;
