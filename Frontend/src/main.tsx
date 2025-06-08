import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  // uri: 'https://flyby-router-demo.herokuapp.com/',
  cache: new InMemoryCache(),
});

client
  .query({
    query: gql`
      query games {
        games {
          id
          title
          platform
        }
      }
      `,
  })
  .then((result) => console.log(result));

createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
)
