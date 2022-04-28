import { Linking } from 'react-native';

const callEmergency = () => {
  Linking.openURL(`tel:22981533173`);
};

export default callEmergency;
