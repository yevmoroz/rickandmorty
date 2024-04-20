import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';

import { useTheme, Theme } from '../theme/hooks';

type Props = {
  children?: JSX.Element | JSX.Element[];
};

export const AppContainer: React.FC<Props> = (props) => {
  const styles = useTheme(themeableStyles);
  return (
    <SafeAreaView style={styles.container}>
      {props.children}
      <ExpoStatusBar backgroundColor={styles.container.backgroundColor} />
    </SafeAreaView>
  );
};

const themeableStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: StatusBar.currentHeight ?? 0,
      backgroundColor: theme.colors.SECONDARY,
    },
  });
