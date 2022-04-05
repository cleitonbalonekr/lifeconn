/* eslint-disable no-unused-expressions */
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';
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
      <Text style={tailwind('w-14 text-center text-xs')}>{label}</Text>
    </TouchableOpacity>
  );
};

export default HeaderIconNavigator;
