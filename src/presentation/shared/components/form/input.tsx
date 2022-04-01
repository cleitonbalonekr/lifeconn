import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

interface Props extends TextInputProps {
  label?: string;
}

const Input: React.FC<Props> = ({ label, ...rest }: Props) => {
  const tailwind = useTailwind();
  return (
    <View style={tailwind('my-2.5')}>
      {label && <Text style={tailwind('mb-1.5')}>{label}</Text>}
      <TextInput style={tailwind('bg-gray-200 p-2 rounded')} {...rest} />
    </View>
  );
};

export default Input;
