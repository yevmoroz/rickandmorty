import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, from } from '@apollo/client';
import { RetryLink } from '@apollo/client/link/retry';

const timeStartLink = new ApolloLink((operation, forward) => {
  operation.setContext({ start: Date.now() });
  return forward(operation);
});

const logTimeLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((data) => {
    // data from a previous link
    const time = Date.now() - operation.getContext().start;
    console.log(`operation "${operation.operationName}" took ${time}ms to complete`);
    return data;
  });
});

const linkChain = from([
  timeStartLink,
  logTimeLink,
  new RetryLink(),
  new HttpLink({ uri: 'https://rickandmortyapi.com/graphql' }),
]);

export const client = new ApolloClient({
  link: linkChain,
  cache: new InMemoryCache(),
});
