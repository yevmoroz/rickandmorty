import { Text, View, Image, StyleSheet } from 'react-native';

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

export const CharacterItem = (props) => {
  const styles = useTheme(themeableStyles);

  return (
    <View style={styles.item}>
      <Image style={styles.image} src={props.character.image} />
      <View style={styles.info}>
        <Text style={styles.title} ellipsizeMode="tail">
          {props.character.name}
        </Text>
        <View style={styles.spacer} />
        {props.character.location.name !== 'unknown' && (
          <Text style={styles.description}>{props.character.location.name}</Text>
        )}
        <Text style={styles.description}>
          {props.character.gender}, {props.character.species}
        </Text>
      </View>
    </View>
  );
};

const themeableStyles = (theme: Theme) =>
  StyleSheet.create({
    item: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: theme.colors.PRIMARY,
      paddingHorizontal: PAD_L,
      paddingVertical: PAD_M,
      margin: PAD_S,
      borderRadius: BORDER_RADIUS_S,
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
  });
