import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View
} from 'react-native';
import { useTailwind } from 'tailwind-rn';

interface Props extends TouchableOpacityProps {
  label: string;
}

const Option: React.FC<Props> = ({ label, ...rest }) => {
  const tailwind = useTailwind();
  return (
    <TouchableOpacity style={tailwind('mt-1')} {...rest}>
      <View
        style={tailwind(
          'flex flex-row border-b border-gray-300 items-center py-4 '
        )}
      >
        <View style={tailwind('rounded-full bg-slate-300 p-2')}>
          <Ionicons name="person-outline" size={20} />
        </View>
        <Text style={tailwind('text-lg p-2')}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Option;
