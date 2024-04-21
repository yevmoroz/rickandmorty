import { NetworkStatus } from '@apollo/client';
import { Fragment, useState } from 'react';
import { Text } from 'react-native';

import { CharacterDetails } from './character-details';
import { CharacterList } from './character-list';
import { useCharactersByName } from './hooks';

export const Characters: React.FC = () => {
  const [selectedCharacterId, setSelectedCharacterId] = useState<number | null>(null);
  const [characters, { fetchMore, refetch, query }] = useCharactersByName('Rick');

  if (query.loading) {
    return <Text>Loading...</Text>;
  }

  if (selectedCharacterId) {
    return (
      <CharacterDetails id={selectedCharacterId} onBack={() => setSelectedCharacterId(null)} />
    );
  }

  return (
    <Fragment>
      <CharacterList
        characters={characters}
        onEndReached={fetchMore}
        onRefresh={refetch}
        refreshing={query.networkStatus === NetworkStatus.refetch}
        onItemPress={setSelectedCharacterId}
      />
    </Fragment>
  );
};
