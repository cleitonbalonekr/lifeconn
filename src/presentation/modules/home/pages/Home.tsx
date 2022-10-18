/* eslint-disable react/jsx-curly-newline */
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import Container from '@/presentation/shared/components/Container';

import Header from '../components/Header';
import HelpButton from '../components/HelpButton';

const OPTIONS_LIST = [
  {
    id: '1',
    icon: 'cog',
    label: 'Config',
    navigateTo: 'Settings'
  },
  {
    id: '2',
    icon: '',
    label: '',
    navigateTo: '',
    hidden: true
  },
  {
    id: '3',
    icon: 'bell',
    label: 'Notificações',
    navigateTo: 'Notifications'
  },
  {
    id: '4',
    icon: 'book-open',
    label: 'Guia',
    navigateTo: 'Guides'
  },
  {
    id: '5',
    icon: 'hand-holding-heart',
    label: 'Nos ajude',
    navigateTo: 'Donate'
  },
  {
    id: '6',
    icon: 'address-book',
    label: 'Pessoas próximas',
    navigateTo: 'Contacts'
  }
];

type Routes = 'Settings' | 'Notifications' | 'Donate' | 'Contacts' | 'Event';

const Home: React.FC = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation();
  function handleNavigateTo(navigateTo: Routes) {
    navigation.navigate(navigateTo);
  }
  function handleNavigateToEvent() {
    navigation.navigate('Event', {
      fromHelpSomeoneElse: false
    });
  }

  return (
    <Container>
      <Header />
      <HelpButton onPress={handleNavigateToEvent} />
      <View style={tailwind('mt-2 flex-1')}>
        <View style={tailwind('border border-gray-300 my-4 ')} />
        <Text style={tailwind('text-center font-ubuntu-bold')}>Menu</Text>
        <FlatList
          numColumns={3}
          contentContainerStyle={tailwind('justify-center items-center ')}
          showsVerticalScrollIndicator={false}
          data={OPTIONS_LIST}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={tailwind(
                'px-2 py-3 mx-2 w-28 items-center justify-center'
              )}
              onPress={() =>
                !item.hidden ? handleNavigateTo(item.navigateTo as Routes) : {}
              }
            >
              <FontAwesome5
                name={item.icon}
                size={45}
                style={tailwind('text-zinc-600')}
              />
              <Text style={tailwind('mt-1 text-center font-ubuntu')}>
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </Container>
  );
};

export default Home;
