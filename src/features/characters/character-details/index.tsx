import { NetworkStatus, useFragment, useQuery } from '@apollo/client';
import { Fragment } from 'react';
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
import { CHARACTER_FRAGMENT, GET_EPISODES_BY_CHARACTER_ID } from '../queries';

export const CharacterDetails = (props) => {
  const styles = useTheme(themeableStyles);

  const fragment = useFragment({
    fragment: CHARACTER_FRAGMENT,
    fragmentName: 'CharacterFragment',
    from: {
      __typename: 'Character',
      id: props.id,
    },
  });
  const character = fragment.data;

  const query = useQuery(GET_EPISODES_BY_CHARACTER_ID, {
    fetchPolicy: 'network-only',
    variables: {
      characterId: props.id,
    },
  });

  const episodes = query.data?.character?.episode;

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
        {query.networkStatus === NetworkStatus.loading ? (
          <Text style={styles.description}>Loading ...</Text>
        ) : (
          <Fragment>
            {episodes?.slice(0, 10).map?.((item) => (
              <Text key={item.id} style={styles.description}>
                - "{item.name}" with {item.characters?.length - 1} more
              </Text>
            ))}
            {episodes.length > 10 && (
              <Text style={styles.description}>...and {episodes.length - 10} more</Text>
            )}
          </Fragment>
        )}
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
