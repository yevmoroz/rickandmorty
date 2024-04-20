## Rick and Morty Library

Collection of all episodes and seasons of unique series that fuel curiosity

## How to use

The app is published to Expo and can be used via Expo Go app. You may need to have Expo Go installed on [Android](https://play.google.com/store/apps/details?id=host.exp.exponent) or [iOS](https://apps.apple.com/ca/app/expo-go/id982107779). When it's done, go ahead and scan with the phone QR code to run the app through Expo Go or :

![](https://qr.expo.dev/eas-update?appScheme=exp&projectId=7327fdf7-09c0-4ebc-9295-8f689ff15722&channel=master&runtimeVersion=1.0.0&host=u.expo.dev)

### Development

Install Xcode and ensure you've installed iOS libraries when opened Xcode at least once, currently supported Xcode 15.3.

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
