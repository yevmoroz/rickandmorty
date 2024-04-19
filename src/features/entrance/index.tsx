import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import { AppContainer } from '../app-container';
import { Characters } from '../characters';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
});

export const Entrance: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <AppContainer>
        <Characters />
      </AppContainer>
    </ApolloProvider>
  );
};
