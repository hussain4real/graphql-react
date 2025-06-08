import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const ADD_REVIEW = gql`
  mutation AddReview($review: AddReviewInput!) {
    addReview(review: $review) {
      id
      rating
      content
      author {
        id
        name
        verified
      }
      game {
        id
        title
      }
    }
  }
`;

interface AddReviewFormProps {
    gameId: string;
    onReviewAdded: () => void; // Callback to refetch game details
}

const AddReviewForm: React.FC<AddReviewFormProps> = ({ gameId, onReviewAdded }) => {
    const [rating, setRating] = useState<number>(5);
    const [content, setContent] = useState('');
    const [addReview, { loading, error }] = useMutation(ADD_REVIEW);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) {
            alert('Review content cannot be empty.');
            return;
        }
        try {
            console.log('Submitting review with variables:', {
                review: {
                    rating: parseInt(rating.toString(), 10),
                    content,
                    game_id: gameId,
                    author_id: '1',
                },
            });
            
            const result = await addReview({
                variables: {
                    review: {
                        rating: parseInt(rating.toString(), 10), // Ensure rating is an Int
                        content,
                        game_id: gameId,
                        author_id: '1', // Hardcoding author_id to '1' (John Doe) for now
                    },
                },
            });
            
            console.log('Review submission successful:', result);
            setContent('');
            setRating(5);
            onReviewAdded(); // Trigger refetch or update in parent
        } catch (err) {
            console.error('Failed to add review:', err);
            // Error state is already handled by useMutation hook's error object
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-8 p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Add Your Review</h3>
            <div className="mb-4">
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rating (1-5)</label>
                <input
                    type="number"
                    id="rating"
                    name="rating"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(parseInt(e.target.value, 10))}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 dark:text-white"
                    required
                />
            </div>
            <div className="mb-6">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Review</label>
                <textarea
                    id="content"
                    name="content"
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 dark:text-white"
                    required
                />
            </div>
            <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors duration-300"
            >
                {loading ? 'Submitting...' : 'Submit Review'}
            </button>
            {error && <p className="mt-3 text-sm text-red-600 dark:text-red-400">Error submitting review: {error.message}</p>}
        </form>
    );
};

export default AddReviewForm;
