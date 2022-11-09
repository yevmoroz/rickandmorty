import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import { useTheme } from '../theme/hooks';
import { Theme } from '../theme/type';

type Props = {
  children?: JSX.Element | JSX.Element[];
};

export const AppContainer: React.FC<Props> = (props) => {
  const themedStyles = useTheme(styles);
  return (
    <View style={themedStyles.container}>
      {props.children}
      <StatusBar backgroundColor={themedStyles.container.backgroundColor} />
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.PRIMARY,
    },
  });
