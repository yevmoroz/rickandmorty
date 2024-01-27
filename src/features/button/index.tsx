import { StyleSheet, View, Text, Pressable } from 'react-native';

import {
  BORDER_RADIUS_S,
  FONT_SIZE_TITLE,
  FONT_WEIGHT_BOLD,
  PAD_L,
  PAD_S,
  PAD_XXL,
} from '../theme/common';
import { useTheme, Theme } from '../theme/hooks';

type Props = {
  onPress: () => void;
  children: string;
};

export const Button: React.FC<Props> = (props) => {
  const styles = useTheme(themeableStyles);
  return (
    <Pressable onPress={props.onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>{props.children}</Text>
      </View>
    </Pressable>
  );
};

const themeableStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      marginHorizontal: PAD_XXL,
      marginVertical: PAD_S,
      paddingHorizontal: PAD_S,
      paddingVertical: PAD_L,
      minWidth: 200,
      borderRadius: BORDER_RADIUS_S,
      backgroundColor: theme.colors.PRIMARY,
      alignItems: 'center',
    },
    text: {
      color: theme.colors.SECONDARY,
      fontWeight: FONT_WEIGHT_BOLD,
      fontSize: FONT_SIZE_TITLE,
    },
  });
