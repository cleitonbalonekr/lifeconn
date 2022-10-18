import React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  TouchableOpacityProps
} from 'react-native';
import { useTailwind } from 'tailwind-rn';

import hartPulseImg from '@/presentation/shared/assets/heart-pulse.png';

interface Props extends TouchableOpacityProps {}

const HelpButton: React.FC<Props> = ({ ...rest }) => {
  const tailwind = useTailwind();
  return (
    <TouchableOpacity style={tailwind('items-center flex-1')} {...rest}>
      <Image
        source={hartPulseImg}
        resizeMode="contain"
        style={tailwind('w-full h-5/6')}
      />
      <Text style={tailwind('font-ubuntu-bold')}>Pedir ajuda</Text>
    </TouchableOpacity>
  );
};

export default HelpButton;
