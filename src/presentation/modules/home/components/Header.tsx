import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';

import HeaderIconNavigator from './HeaderIconNavigator';

const Header: React.FC = () => {
  const tailwind = useTailwind();
  return (
    <View style={tailwind('mt-12 mb-4 flex-row items-center justify-between ')}>
      <View style={tailwind('items-center justify-center')}>
        <View
          style={tailwind(
            'rounded-full bg-green-600 w-12 h-12 items-center justify-center'
          )}
        >
          <Ionicons name="person-outline" size={20} />
        </View>
        <Text
          numberOfLines={2}
          style={tailwind('text-xs mt-2 w-20 text-center')}
        >
          Cleiton Baloneker
        </Text>
      </View>
      <View style={tailwind('flex-row ')}>
        <HeaderIconNavigator label="Para mim" icon="heart" />
        <HeaderIconNavigator label="Para outro" icon="pulse" active={false} />
      </View>
    </View>
  );
};

export default Header;
