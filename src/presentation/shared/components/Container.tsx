import React from 'react';
import { SafeAreaView, ScrollView, View, ViewProps } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';

interface Props extends ViewProps {
  scroll?: boolean;
  bgColor?: string;
}

const Container: React.FC<Props> = ({
  children,
  scroll = false,
  bgColor,
  ...rest
}) => {
  const tailwind = useTailwind();
  const backgroundColor = bgColor || 'bg-slate-100';
  return scroll ? (
    <SafeAreaView style={tailwind(`flex-1 ${backgroundColor}`)}>
      <ScrollView
        style={tailwind(`${backgroundColor}`)}
        contentContainerStyle={tailwind(`p-4 flex-grow  ${backgroundColor}`)}
        {...rest}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  ) : (
    <View style={tailwind(`flex-1 p-4 ${backgroundColor}`)} {...rest}>
      {children}
    </View>
  );
};

export default Container;
