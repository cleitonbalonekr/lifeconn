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

const ButtonOutline: React.FC<Props> = ({
  label,
  children,
  type = 'success',
  ...rest
}: Props) => {
  const tailwind = useTailwind();

  const getButtonColorByType = () => {
    switch (type) {
      case 'success':
        return 'border-emerald-600';
      case 'warning':
        return 'border-yellow-600';
      case 'danger':
        return 'border-red-600';
      default:
        return 'border-blue-600';
    }
  };

  const getTextColorByType = () => {
    switch (type) {
      case 'success':
        return 'text-emerald-600';
      case 'warning':
        return 'text-yellow-600';
      case 'danger':
        return 'text-red-600';
      default:
        return 'text-blue-600';
    }
  };

  const hasPadding = children && label ? 'pl-2' : '';

  return (
    <TouchableOpacity
      style={tailwind(
        `flex flex-row p-3 py-4 items-center justify-center ${getButtonColorByType()} rounded-lg border-2`
      )}
      {...rest}
    >
      <View>{children}</View>
      {label && (
        <Text
          style={tailwind(
            `${hasPadding} ${getTextColorByType()} font-semibold font-ubuntu-medium`
          )}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default ButtonOutline;
