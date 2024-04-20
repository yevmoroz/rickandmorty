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
  const nextPage = query.data?.characters?.info?.next;

  const onEndReached = useCallback(() => {
    const onUpdateQuery = (prev, { fetchMoreResult: result }) => {
      const nextPage = result.characters.info.next;
      if (nextPage > prev.characters.info.next || nextPage === null) {
        // prefer unshift to avoid array copies affecting performance health
        result.characters.results.unshift(...prev.characters.results);
        return result;
      }
      return prev;
    };
    if (nextPage !== null) {
      query.fetchMore({
        variables: {
          charactersByNameFilter: { name: nameFilter },
          page: nextPage,
        },
        updateQuery: onUpdateQuery,
      });
    }
  }, [nextPage]);

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
