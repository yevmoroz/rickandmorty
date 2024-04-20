import { NetworkStatus, useQuery } from '@apollo/client';
import { Fragment, useCallback, useRef } from 'react';
import { Text } from 'react-native';

import { CharacterList } from './character-list';
import { GET_CHARACTERS_BY_NAME } from './queries';

export const Characters: React.FC = () => {
  const nameFilter = useRef('Rick').current;
  const query = useQuery(GET_CHARACTERS_BY_NAME, {
    variables: {
      charactersByNameFilter: { name: nameFilter },
    },
  });
  const onEndReached = useCallback(() => {
    if (query.data.characters.info.next !== null) {
      query.fetchMore({
        variables: {
          charactersByNameFilter: { name: nameFilter },
          page: query.data.characters.info.next,
        },
        updateQuery: (prev, { fetchMoreResult: result }) => {
          const nextPageExists = result.characters.info.next > prev.characters.info.next;
          const lastPageOnly =
            result.characters.info.pages > 1 && result.characters.info.next === null;

          if (nextPageExists || lastPageOnly) {
            return {
              characters: {
                ...result.characters,
                results: [...prev.characters.results, ...result.characters.results],
              },
            };
          }

          return result;
        },
      });
    }
  }, [query]);

  if (query.networkStatus === NetworkStatus.loading) {
    return <Text>Loading...</Text>;
  }
  if (query.error) {
    return <Text>Error: {query.error.message}</Text>;
  }

  return (
    <Fragment>
      <CharacterList
        characters={query.data?.characters?.results}
        onEndReached={onEndReached}
        onRefresh={query.refetch}
        refreshing={query.networkStatus === NetworkStatus.refetch}
      />
    </Fragment>
  );
};
