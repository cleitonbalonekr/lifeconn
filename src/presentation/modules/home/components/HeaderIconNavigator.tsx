/* eslint-disable no-unused-expressions */
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  View
} from 'react-native';
import { useTailwind } from 'tailwind-rn';

interface Props extends TouchableOpacityProps {
  active?: boolean;
  icon: 'heart' | 'pulse';
  label: string;
}

const HeaderIconNavigator: React.FC<Props> = ({
  active = true,
  icon,
  label,
  children,
  ...rest
}) => {
  const tailwind = useTailwind();
  const applyIconStyle = () => {
    return active ? 'text-red-700' : 'text-zinc-900 text-opacity-80';
  };
  return (
    <TouchableOpacity style={tailwind('mr-6 items-center')} {...rest}>
      {children}
      <Ionicons name={icon} size={56} style={tailwind(applyIconStyle())} />
      <Text style={tailwind('w-16 text-center text-xs font-ubuntu-light')}>
        {label}
      </Text>
      {active && (
        <View style={tailwind('border w-full border-red-700 my-1.5 ')} />
      )}
    </TouchableOpacity>
  );
};

export default HeaderIconNavigator;
