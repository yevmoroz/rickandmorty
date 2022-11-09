import { Alert } from 'react-native';

import { AppContainer } from '../app-container';
import { Button } from '../button';

const onPressStart = (): void => {
  Alert.alert('Hold your horses, start small and take your time');
};

export const Entrance: React.FC = () => {
  return (
    <AppContainer>
      <Button onPress={onPressStart}>Start</Button>
    </AppContainer>
  );
};
