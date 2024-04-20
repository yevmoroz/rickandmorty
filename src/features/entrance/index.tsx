import { ApolloProvider } from '@apollo/client';

import { client } from '../apollo';
import { AppContainer } from '../app-container';
import { Characters } from '../characters';

export const Entrance: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <AppContainer>
        <Characters />
      </AppContainer>
    </ApolloProvider>
  );
};
