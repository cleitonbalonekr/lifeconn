import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import React, { useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import Container from '@/presentation/shared/components/Container';
import Button from '@/presentation/shared/components/form/button';
import Input from '@/presentation/shared/components/form/input';
import useInputState from '@/presentation/shared/hooks/useInputState';

import MedicalInfoElse from '../components/MedicalInfoElse';

const fakeMedicalInfo = [
  {
    id: '1',
    title: 'Tipo sanguíneo',
    value: 'O+'
  },
  {
    id: '2',
    title: 'Intolerância',
    value: 'Lactose'
  },
  {
    id: '3',
    title: 'Grande texto',
    value:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. text of the printing and typesetting industry'
  }
];

const DetailsNotification: React.FC = () => {
  const tailwind = useTailwind();
  const email = useInputState({
    name: 'email'
  });
  const fullName = useInputState({
    name: 'fullName'
  });
  const phoneNumber = useInputState({
    name: 'phoneNumber'
  });
  const lat = useInputState({
    name: 'lat',
    initialValue: '0as'
  });
  const lng = useInputState({
    name: 'lng',
    initialValue: '0'
  });

  function handleOpenMaps() {
    const url = `https://www.google.pt/maps?q=${lat.value},${lng.value}`;

    Linking.openURL(url);
  }

  useEffect(() => {
    lat.set('-22.3493313');
    lng.set('-42.3993805');
    email.set('test@gm.com');
    phoneNumber.set('22992725861');
    fullName.set('Fulano');
  }, []);

  return (
    <Container scroll>
      <View
        style={tailwind(
          'flex flex-row border-b border-gray-300 items-center py-4 '
        )}
      >
        <View style={tailwind('rounded-full bg-slate-300 p-3')}>
          <Ionicons name="person-outline" size={20} />
        </View>
        <Text style={tailwind('text-lg text-center px-2 font-ubuntu')}>
          {fullName.value}
        </Text>
      </View>
      <View style={tailwind('flex-1 border-b border-gray-300')}>
        <Input label="Email" editable value={email.value} />
        <Input label="Telefone" editable value={phoneNumber.value} />
        <View style={tailwind('flex-row flex-1 justify-around')}>
          <View style={tailwind('flex-1  mr-1')}>
            <Input editable label="Latitude" value={lat.value} />
          </View>
          <View style={tailwind('flex-1 ml-1')}>
            <Input editable label="Longitude" value={lng.value} />
          </View>
        </View>
      </View>
      <View style={tailwind('flex-1 py-4')}>
        <Text style={tailwind('text-lg font-ubuntu')}>Informações médicas</Text>
        <FlatList
          data={fakeMedicalInfo}
          style={tailwind('mt-4')}
          contentContainerStyle={tailwind('flex-grow')}
          keyExtractor={(item) => String(item.id)}
          horizontal
          renderItem={({ item }) => <MedicalInfoElse item={item} />}
          ListEmptyComponent={() => (
            <View style={tailwind('flex-1 h-36 items-center justify-center')}>
              <Text style={tailwind('font-ubuntu-bold')}>
                Nenhuma informação médica
              </Text>
            </View>
          )}
        />
      </View>
      <View style={tailwind('flex-1 justify-end')}>
        <Button label="Traçar rota" type="primary" onPress={handleOpenMaps}>
          <Ionicons
            name="navigate-outline"
            size={20}
            style={tailwind('text-white')}
          />
        </Button>
      </View>
    </Container>
  );
};

export default DetailsNotification;
