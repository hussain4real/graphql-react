import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import './App.css';
import GameItem, { type Game as GameType } from './components/GameItem'; // Renamed Game to GameType to avoid conflict and added type keyword
import GameDetails from './components/GameDetails';

const GET_GAMES = gql`
  query GetGames {
    games {
      id
      title
      platform
      reviews {
        id # Added to count reviews
      }
    }
  }
`;

interface GamesData {
  games: GameType[];
}

function App() {
  const { loading, error, data } = useQuery<GamesData>(GET_GAMES);
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);

  if (loading) return <p className="text-center py-10 text-xl">Loading games...</p>;
  if (error) return <p className="text-center py-10 text-xl text-red-500">Error loading games: {error.message}</p>;

  if (selectedGameId) {
    return <GameDetails gameId={selectedGameId} onBack={() => setSelectedGameId(null)} />;
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-4 md:p-8">
      <header className="mb-10 text-center">
        <h1 className="text-5xl font-bold text-gray-800 dark:text-white">Game Explorer</h1>
      </header>
      {data && data.games.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.games.map((game) => (
            <GameItem key={game.id} game={game} onSelectGame={setSelectedGameId} />
          ))}
        </div>
      ) : (
        <p className="text-center text-xl text-gray-600 dark:text-gray-400">No games found.</p>
      )}
    </div>
  );
}

export default App;
