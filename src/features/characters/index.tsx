import { gql, useQuery } from '@apollo/client';
import { Fragment } from 'react';
import { Alert, ScrollView, Text } from 'react-native';

import { Button } from '../button';

const onPressStart = (): void => {
  Alert.alert(
    "Hold your horses, start small and take your time, son we'll have rick and morty library"
  );
};

const GET_CHARACTERS = gql`
  query {
    characters(page: 2, filter: { name: "rick" }) {
      info {
        count
      }
      results {
        id
        name
      }
    }
    location(id: 1) {
      id
    }
    episodesByIds(ids: [1, 2]) {
      id
    }
  }
`;

export const Characters: React.FC = () => {
  const { loading, error, data } = useQuery(GET_CHARACTERS);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error : {error.message}</Text>;

  return (
    <Fragment>
      <Button onPress={onPressStart}>Start</Button>
      <ScrollView>
        {data?.characters?.results?.map((character) => {
          return <Text key={character.id}>{character.name}</Text>;
        })}
      </ScrollView>
    </Fragment>
  );
};
