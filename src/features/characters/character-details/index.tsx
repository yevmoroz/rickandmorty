import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';

import {
  BORDER_RADIUS_S,
  FONT_SIZE_TEXT,
  FONT_SIZE_TITLE,
  FONT_WEIGHT_BOLD,
  PAD_L,
  PAD_M,
  PAD_S,
} from '../../theme/common';
import { useTheme, Theme } from '../../theme/hooks';
import { CharacterEpisodes } from '../character-episodes';
import { useCachedCharacterById } from '../hooks';

export const CharacterDetails = (props) => {
  const styles = useTheme(themeableStyles);
  const [character] = useCachedCharacterById(props.id);

  return (
    <View style={styles.item}>
      <View style={styles.row}>
        <Image style={styles.image} src={character.image} />
        <View style={styles.info}>
          <Text style={styles.title} ellipsizeMode="tail">
            {character.name}
          </Text>
          <View style={styles.spacer} />
          <Text style={styles.description}>Resident of {character.location.name}</Text>
          <Text style={styles.description}>
            Identified as {character.gender}, {character.species}
          </Text>
          <View style={styles.spacer} />
        </View>
      </View>
      <View style={styles.episodes}>
        <Text style={styles.title} ellipsizeMode="tail">
          Seen in episodes
        </Text>
        <View style={styles.spacer} />
        <CharacterEpisodes id={props.id} />
      </View>
      <View style={styles.spacer} />
      <TouchableOpacity onPress={props.onBack}>
        <Text style={styles.link}>go back</Text>
      </TouchableOpacity>
    </View>
  );
};

const themeableStyles = (theme: Theme) =>
  StyleSheet.create({
    item: {
      width: '100%',
      backgroundColor: theme.colors.PRIMARY,
      paddingHorizontal: PAD_L,
      paddingVertical: PAD_M,
      margin: PAD_S,
    },
    row: {
      flexDirection: 'row',
    },
    episodes: {
      marginTop: PAD_M,
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: BORDER_RADIUS_S,
    },
    info: {
      marginLeft: PAD_M,
    },
    title: {
      color: theme.colors.SECONDARY,
      fontSize: FONT_SIZE_TITLE,
      fontWeight: FONT_WEIGHT_BOLD,
    },
    spacer: {
      marginTop: PAD_S,
    },
    description: {
      color: theme.colors.SECONDARY,
      fontSize: FONT_SIZE_TEXT,
    },
    link: {
      color: theme.colors.SECONDARY,
      fontSize: FONT_SIZE_TEXT,
      textDecorationLine: 'underline',
    },
  });
