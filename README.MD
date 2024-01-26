## Expo starter

Expo starter package, includes:
- Expo with TypeScript support
- Theme base styles
- ESLint + Prettier
- Feature based architecture

### Fork

After you fork project under it's new name, update `expo-starter` in `package.json` file to reflect the change. Make sure you configure `EXPO_TOKEN` (from expo.dev account settings > access tokens) and `EXPO_PROJECT_ID` (from Projects > Project Overview > ID, looks like UUID)

### Development

Install dependencies with `npm install`. Create new project in Expo via [this link](https://expo.dev/) and following instructions how to set it up.
Start developement by running regular `npm start`. Follow on screen prompt to setup expo on iOS/Android device.

### WSL support

If you're using WSL, there is no initial support for routes from WSL through Windows to iOS/Android device. In order to make such support feel free to make use of `scripts/wslbridge.ps1`.

Run on windows `scripts/wslbridge.ps1` and use `npm run start:wsl` instead of regular start.

### References
- [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Feature based archtecture](https://www.freecodecamp.org/news/scaling-your-redux-app-with-ducks-6115955638be/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Node.js](https://nodejs.org/)
