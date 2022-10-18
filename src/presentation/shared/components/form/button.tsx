import React from 'react';
import {
  ActivityIndicator,
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
  loading?: boolean;
}

const Button: React.FC<Props> = ({
  label,
  children,
  type = 'success',
  loading = false,
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

  const hasPadding = children && label ? 'pl-2' : '';

  return (
    <TouchableOpacity
      disabled={loading}
      style={tailwind(
        `flex flex-row p-3 py-4 items-center justify-center ${getButtonColorByType()} rounded-lg`
      )}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color="#fff" size="small" />
      ) : (
        <>
          <View>{children}</View>
          {label && (
            <Text
              style={tailwind(
                `${hasPadding} text-white font-semibold font-ubuntu-medium`
              )}
            >
              {label}
            </Text>
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;
