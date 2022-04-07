import React from 'react';
import { SafeAreaView, ScrollView, View, ViewProps } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';

interface Props extends ViewProps {
  scroll?: boolean;
}

const Container: React.FC<Props> = ({ children, scroll = false, ...rest }) => {
  const tailwind = useTailwind();
  return scroll ? (
    <SafeAreaView style={tailwind('flex-1 bg-slate-100')}>
      <ScrollView
        style={tailwind('bg-slate-100')}
        contentContainerStyle={tailwind('p-5 flex-grow  bg-slate-100')}
        {...rest}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  ) : (
    <View style={tailwind('flex-1 p-5 bg-slate-100')} {...rest}>
      {children}
    </View>
  );
};

export default Container;
