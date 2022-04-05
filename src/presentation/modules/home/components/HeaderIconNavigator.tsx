/* eslint-disable no-unused-expressions */
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useTailwind } from 'tailwind-rn';

interface Props {
  active?: boolean;
  icon: 'heart' | 'pulse';
  label: string;
}

const HeaderIconNavigator: React.FC<Props> = ({
  active = true,
  icon,
  label,
  children
}) => {
  const tailwind = useTailwind();
  const applyIconStyle = () => {
    const style = icon === 'heart' ? 'text-red-700' : 'text-zinc-900';
    if (active) {
      `${style} text-opacity-70`;
    }
    return style;
  };
  return (
    <TouchableOpacity style={tailwind('mr-6 items-center')}>
      {children}
      <Ionicons name={icon} size={40} style={tailwind(applyIconStyle())} />
      <Text style={tailwind('w-14 text-center text-xs')}>{label}</Text>
    </TouchableOpacity>
  );
};

export default HeaderIconNavigator;
