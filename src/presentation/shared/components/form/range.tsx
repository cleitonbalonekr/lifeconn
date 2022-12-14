import Slider, { SliderProps } from '@react-native-community/slider';
import React from 'react';
import { Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

interface Props extends SliderProps {
  label?: string;
  error?: string;
}

const Range: React.FC<Props> = ({ label, error, ...rest }: Props) => {
  const tailwind = useTailwind();
  const showError = error !== undefined && error !== '';
  return (
    <View style={tailwind('my-2.5 ')}>
      {label && <Text style={tailwind('mb-1.5 font-ubuntu')}>{label}</Text>}
      <Slider
        style={tailwind('bg-gray-200 p-3 rounded font-ubuntu')}
        {...rest}
      />

      {showError && (
        <Text style={tailwind('text-red-500 my-1 font-ubuntu')}>{error}</Text>
      )}
    </View>
  );
};

export default Range;
