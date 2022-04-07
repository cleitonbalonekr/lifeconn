import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useTailwind } from 'tailwind-rn';

import Container from '@/presentation/shared/components/Container';
import Button from '@/presentation/shared/components/form/button';
import Input from '@/presentation/shared/components/form/input';

const DetailsNotification: React.FC = () => {
  const tailwind = useTailwind();

  return (
    <Container scroll>
      <View
        style={tailwind(
          'flex flex-row border-b border-gray-300 items-center py-4 '
        )}
      >
        <View style={tailwind('rounded-full bg-slate-300 p-2')}>
          <Ionicons name="person-outline" size={20} />
        </View>
        <Text style={tailwind('text-lg text-center px-2')}>Fulano</Text>
      </View>
      <View style={tailwind('border-b border-gray-300')}>
        <Input placeholder="Email" label="Email" />
        <Input placeholder="Telefone" label="Telefone" />
      </View>
      <View style={tailwind('border-b border-gray-300 py-4 ')}>
        <Text style={tailwind('text-lg')}>Informações médicas</Text>
        <Text style={tailwind('text-xs')}>*Tipo sanguineo: A+</Text>
      </View>
      <Input placeholder="Localização" label="localização" />
      <Button label="Traçar rota" type="primary" onPress={() => {}}>
        <Ionicons
          name="trash-bin-outline"
          size={20}
          style={tailwind('text-white')}
        />
      </Button>
      <View style={tailwind('mt-2')}>
        <MapView
          style={{ height: 250, width: 300 }}
          initialRegion={{
            latitude: -22.347511,
            longitude: -42.325261,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        />
        <Marker
          key={1}
          coordinate={{
            latitude: -22.347511,
            longitude: -42.325261
          }}
        >
          <Text>A</Text>
        </Marker>
      </View>
    </Container>
  );
};

export default DetailsNotification;
