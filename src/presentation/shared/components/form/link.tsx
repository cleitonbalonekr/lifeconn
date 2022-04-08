import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { useTailwind } from 'tailwind-rn';

interface Props extends TouchableOpacityProps {
  label: string;
}

const ButtonLink: React.FC<Props> = ({ label, ...rest }) => {
  const tailwind = useTailwind();
  return (
    <TouchableOpacity style={tailwind('mt-1')} {...rest}>
      <Text style={tailwind('text-blue-500 text-lg font-ubuntu')}>{label}</Text>
    </TouchableOpacity>
  );
};

export default ButtonLink;
