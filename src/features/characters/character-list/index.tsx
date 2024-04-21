import { FlatList, StyleSheet } from 'react-native';

import { CharacterItem } from '../character-item';

export const CharacterList = (props) => {
  return (
    <FlatList
      style={styles.container}
      data={props.characters}
      renderItem={({ item }) => (
        <CharacterItem character={item} onPress={() => props.onItemPress(item.id)} />
      )}
      keyExtractor={(item) => item.id}
      onEndReachedThreshold={1}
      onEndReached={props.onEndReached}
      onRefresh={props.onRefresh}
      refreshing={props.refreshing}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
