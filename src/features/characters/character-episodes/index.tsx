import { Fragment } from 'react';
import { Text, StyleSheet } from 'react-native';

import { FONT_SIZE_TEXT } from '../../theme/common';
import { useTheme, Theme } from '../../theme/hooks';
import { useEpisodesByCharacterId } from '../hooks';

export const CharacterEpisodes = (props) => {
  const styles = useTheme(themeableStyles);
  const [episodes, { query }] = useEpisodesByCharacterId(props.id);

  if (query.loading) {
    return <Text style={styles.description}>Loading ...</Text>;
  }

  return (
    <Fragment>
      {episodes?.slice(0, 10).map?.((item) => (
        <Text key={item.id} style={styles.description}>
          - [{item.episode}] "{item.name}" with {item.characters?.length - 1} more
        </Text>
      ))}
      {episodes.length > 10 && (
        <Text style={styles.description}>...and {episodes.length - 10} more</Text>
      )}
    </Fragment>
  );
};

const themeableStyles = (theme: Theme) =>
  StyleSheet.create({
    description: {
      color: theme.colors.SECONDARY,
      fontSize: FONT_SIZE_TEXT,
    },
  });
