import React from 'react';
import { ScrollView, View, ViewProps } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';

interface Props extends ViewProps {
  scroll?: boolean;
}

const Container: React.FC<Props> = ({ children, scroll = false, ...rest }) => {
  const tailwind = useTailwind();
  return scroll ? (
    <ScrollView
      style={tailwind('bg-slate-100')}
      contentContainerStyle={tailwind('flex-1 p-5 bg-slate-100')}
      {...rest}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={tailwind('flex-1 p-5 bg-slate-100')} {...rest}>
      {children}
    </View>
  );
};

export default Container;
