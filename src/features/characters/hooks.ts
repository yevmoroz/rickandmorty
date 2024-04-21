import { useFragment, useQuery } from '@apollo/client';
import { useCallback, useRef } from 'react';

import {
  CHARACTER_FRAGMENT,
  GET_CHARACTERS_BY_NAME,
  GET_EPISODES_BY_CHARACTER_ID,
} from './queries';

export const useCharactersByName = (name: string | null) => {
  const nameFilter = useRef<string | null>(name).current;

  const query = useQuery(GET_CHARACTERS_BY_NAME, {
    fetchPolicy: 'network-only',
    variables: {
      charactersByNameFilter: { name: nameFilter },
    },
  });
  const characters = query.data?.characters?.results;
  const nextPage = query.data?.characters?.info?.next;

  const fetchMore = useCallback(() => {
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

  const refetch = () => {
    query.refetch();
    // hopefully we could invalidate episodes here too
  };

  return [characters, { fetchMore, refetch, query }];
};

export const useCachedCharacterById = (id: number) => {
  const fragment = useFragment({
    fragment: CHARACTER_FRAGMENT,
    fragmentName: 'CharacterFragment',
    from: {
      __typename: 'Character',
      id,
    },
  });
  const character = fragment.data;
  return [character, { fragment }];
};

export const useEpisodesByCharacterId = (id: number) => {
  const query = useQuery(GET_EPISODES_BY_CHARACTER_ID, {
    variables: {
      characterId: id,
    },
  });

  const episodes = query.data?.character?.episode;
  return [episodes, { query }];
};
