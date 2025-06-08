import React from 'react';

interface Review {
    id: string;
}

export interface Game {
    id: string;
    title: string;
    platform: string[];
    reviews: Review[];
}

interface GameItemProps {
    game: Game;
    onSelectGame: (id: string) => void; // Will be used later for navigation
}

const GameItem: React.FC<GameItemProps> = ({ game, onSelectGame }) => {
    return (
        <div
            className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 ease-in-out"
            onClick={() => onSelectGame(game.id)} // Placeholder for future navigation
        >
            <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">{game.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Platforms: {game.platform.join(', ')}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Reviews: {game.reviews.length}
                </p>
            </div>
        </div>
    );
};

export default GameItem;
