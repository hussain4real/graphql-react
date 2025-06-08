import { gql, useQuery } from '@apollo/client';
import './App.css';

const GET_GAMES = gql`
  query GetGames {
    games {
      id
      title
      platform
    }
  }
`;

interface Game {
  id: string;
  title: string;
  platform: string[];
}

interface GamesData {
  games: Game[];
}

function App() {
  const { loading, error, data } = useQuery<GamesData>(GET_GAMES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( {error.message}</p>;

  return (
    <>
      <div>
        <p className="container mx-auto text-teal-600 text-3xl font-bold underline">
          Hello Vite + React + Tailwind CSS!
        </p>
      </div>
      <h1>Games List</h1>
      {data && data.games.map(({ id, title, platform }) => (
        <div key={id}>
          <h2>{title}</h2>
          <p>Platforms: {platform.join(', ')}</p>
        </div>
      ))}
    </>
  );
}

export default App;
