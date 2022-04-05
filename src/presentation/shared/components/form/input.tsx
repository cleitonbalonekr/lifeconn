import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

interface Props extends TextInputProps {
  label?: string;
  error?: string;
}

const Input: React.FC<Props> = ({ label, error, ...rest }: Props) => {
  const tailwind = useTailwind();
  const showError = error !== undefined && error !== '';
  return (
    <View style={tailwind('my-2.5 ')}>
      {label && <Text style={tailwind('mb-1.5')}>{label}</Text>}
      <TextInput style={tailwind('bg-gray-200 p-2 rounded')} {...rest} />
      {showError && <Text style={tailwind('text-red-500 my-1')}>{error}</Text>}
    </View>
  );
};

export default Input;
