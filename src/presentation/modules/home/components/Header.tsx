import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';

import HeaderIconNavigator from './HeaderIconNavigator';

interface Props {
  from?: 'home' | 'help';
}

const Header: React.FC<Props> = ({ from = 'home' }) => {
  const tailwind = useTailwind();
  const navigation = useNavigation();

  function handleNavigationToHome() {
    navigation.navigate('Home');
  }
  function handleNavigationToHelpSomeoneElse() {
    navigation.navigate('HelpSomeoneElse');
  }
  return (
    <View style={tailwind('mt-12 mb-4 pb-1 overflow-hidden')}>
      <View
        style={[
          tailwind(' flex-row items-center justify-between bg-slate-100 pb-2 '),
          styles.shadow
        ]}
      >
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
          <HeaderIconNavigator
            label="Para mim"
            icon="heart"
            active={from === 'home'}
            onPress={handleNavigationToHome}
          />
          <HeaderIconNavigator
            label="Para outro"
            icon="pulse"
            active={from !== 'home'}
            onPress={handleNavigationToHelpSomeoneElse}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 6
  }
});

export default Header;