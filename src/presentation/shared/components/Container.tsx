import React from 'react';
import { View, ViewProps } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';

interface Props extends ViewProps {}

const Container: React.FC<Props> = ({ children, ...rest }) => {
  const tailwind = useTailwind();
  return (
    <View style={tailwind('flex-1 p-6 bg-slate-100')} {...rest}>
      {children}
    </View>
  );
};

export default Container;
