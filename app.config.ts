import { ExpoConfig } from 'expo/config';

import * as pkg from './package.json';

const config: ExpoConfig = {
  name: pkg.name,
  slug: pkg.name,
  version: '1.0.0',
  owner: 'yevmoroz',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
    },
  },
};

export default config;
