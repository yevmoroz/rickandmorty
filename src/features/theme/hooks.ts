import { useColorScheme } from 'react-native';

import { Theme } from './type';

export const useTheme = <T>(themeableStyles: (theme: Theme) => T) => {
  const colorScheme = useColorScheme();

  let colors = null;
  if (colorScheme === 'light') {
    colors = require('./light/colors');
  } else if (colorScheme === 'dark') {
    colors = require('./dark/colors');
  } else {
    throw new Error('Unsupported theme');
  }

  const theme: Theme = {
    colors,
  };
  return themeableStyles(theme);
};
