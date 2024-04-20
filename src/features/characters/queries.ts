import { gql } from '@apollo/client';

export const GET_CHARACTERS_BY_NAME = gql`
  query GetCharactersByName($charactersByNameFilter: FilterCharacter, $page: Int) {
    characters(filter: $charactersByNameFilter, page: $page) {
      results {
        location {
          name
        }
        name
        species
        type
        gender
        image
        id
      }
      info {
        pages
        next
        count
      }
    }
  }
`;
