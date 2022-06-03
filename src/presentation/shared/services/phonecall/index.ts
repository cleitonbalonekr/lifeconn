import { Linking } from 'react-native';

import { CALL_NUMBER_EMERGENCY } from '@/configs/index';

const callEmergency = () => {
  Linking.openURL(`tel:${CALL_NUMBER_EMERGENCY}`);
};

export default callEmergency;
