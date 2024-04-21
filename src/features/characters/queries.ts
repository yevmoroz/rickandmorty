import { gql } from '@apollo/client';

export const CHARACTER_FRAGMENT = gql`
  fragment CharacterFragment on Character {
    name
    species
    gender
    image
    location {
      name
    }
  }
`;

export const GET_CHARACTERS_BY_NAME = gql`
  query GetCharactersByName($charactersByNameFilter: FilterCharacter, $page: Int) {
    characters(filter: $charactersByNameFilter, page: $page) {
      results {
        ...CharacterFragment
        id
      }
      info {
        pages
        next
      }
    }
  }
  ${CHARACTER_FRAGMENT}
`;

export const GET_EPISODES_BY_CHARACTER_ID = gql`
  query EpisodesByCharacterId($characterId: ID!) {
    character(id: $characterId) {
      id
      episode {
        id
        name
        episode
        characters {
          id
        }
      }
    }
  }
  ${CHARACTER_FRAGMENT}
`;
