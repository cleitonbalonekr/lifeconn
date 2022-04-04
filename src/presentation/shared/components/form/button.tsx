import React from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View
} from 'react-native';
import { useTailwind } from 'tailwind-rn';

type ButtonStatusType = 'success' | 'warning' | 'danger' | 'primary';

interface Props extends TouchableOpacityProps {
  label?: string;
  type?: ButtonStatusType;
}

const Button: React.FC<Props> = ({
  label,
  children,
  type = 'success',
  ...rest
}: Props) => {
  const tailwind = useTailwind();

  const getButtonColorByType = () => {
    switch (type) {
      case 'success':
        return 'bg-emerald-600';
      case 'warning':
        return 'bg-yellow-600';
      case 'danger':
        return 'bg-red-600';
      default:
        return 'bg-blue-600';
    }
  };

  return (
    <TouchableOpacity
      style={tailwind(
        `flex flex-row p-3 py-4 items-center justify-center ${getButtonColorByType()} rounded-lg`
      )}
      {...rest}
    >
      <View style={tailwind('pr-2')}>{children}</View>
      {label && (
        <Text style={tailwind('text-white font-semibold')}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
