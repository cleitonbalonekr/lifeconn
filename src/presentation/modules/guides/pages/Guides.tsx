/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';

import Container from '@/presentation/shared/components/Container';

import DetailsBasicMechanics from '../components/GuideBasicMechanics/DetailsBasicMechanics';
import DetailsFirstAid from '../components/GuideFirstAid/DetailsFirstAid';

enum HeaderMenu {
  FirstAid,
  BasicMechanics
}

const Guides: React.FC = () => {
  const [selectedHeader, setSelectedHeader] = useState(HeaderMenu.FirstAid);
  const tailwind = useTailwind();

  function handleNavigationToDetailsFirstAid() {
    setSelectedHeader(HeaderMenu.FirstAid);
    // navigation.navigate('DetailsFirstAid');
  }
  function handleNavigationToDetailsBasicMechanics() {
    setSelectedHeader(HeaderMenu.BasicMechanics);
    // navigation.navigate('DetailsBasicMechanics');
  }
  return (
    <Container>
      <View style={tailwind('flex-row justify-center py-3 ')}>
        <View style={tailwind('flex-1 mr-2')}>
          <TouchableOpacity
            style={tailwind('items-center justify-center ')}
            onPress={handleNavigationToDetailsFirstAid}
          >
            <Ionicons
              name="heart-half"
              size={30}
              style={tailwind('text-red-600')}
            />
            <Text>Primeiros socorros</Text>
            {selectedHeader === HeaderMenu.FirstAid && (
              <View style={tailwind('border w-full border-red-700 my-1.5 ')} />
            )}
          </TouchableOpacity>
        </View>
        <View style={tailwind('flex-1 ml-2')}>
          <TouchableOpacity
            style={tailwind('items-center justify-center ')}
            onPress={handleNavigationToDetailsBasicMechanics}
          >
            <Ionicons
              name="car-outline"
              size={30}
              style={tailwind('text-zinc-500')}
            />
            <Text>Mecânica Básica</Text>
            {selectedHeader === HeaderMenu.BasicMechanics && (
              <View style={tailwind('border w-full border-red-700 my-1.5 ')} />
            )}
          </TouchableOpacity>
        </View>
      </View>
      {selectedHeader === HeaderMenu.FirstAid && <DetailsFirstAid />}
      {selectedHeader === HeaderMenu.BasicMechanics && (
        <DetailsBasicMechanics />
      )}
    </Container>
  );
};

export default Guides;
