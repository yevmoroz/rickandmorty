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
  defaultOptions: {
    watchQuery: {
      // our strategy is to avoid 2nd fetch of the same request,
      // if variables change request is not the same as well
      nextFetchPolicy(currentFetchPolicy, { reason, initialFetchPolicy }) {
        // When variables change, the default behavior is to reset
        // options.fetchPolicy to context.initialFetchPolicy. If you omit this logic,
        // your nextFetchPolicy function can override this default behavior to
        // prevent options.fetchPolicy from changing in this case.
        if (reason === 'variables-changed') {
          return initialFetchPolicy;
        }
        if (currentFetchPolicy === 'network-only' || currentFetchPolicy === 'cache-and-network') {
          // Demote the network policies (except "no-cache") to "cache-first"
          // after the first request.
          return 'cache-first';
        }
        // Leave all other fetch policies unchanged.
        return currentFetchPolicy;
      },
    },
  },
});
