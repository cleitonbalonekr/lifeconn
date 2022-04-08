import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';

import { commonStyle } from '@/presentation/shared/styles/commonStyle';

type Item = {
  victimName: string;
  id: string;
  router: string;
};
interface Props {
  item: Item;
}

const Option: React.FC<Props> = ({ item }) => {
  const tailwind = useTailwind();
  const navigation = useNavigation();

  function handleNavigation(router: any) {
    navigation.navigate(router);
  }
  return (
    <View style={tailwind('pb-1 overflow-hidden ')}>
      <TouchableOpacity
        onPress={() => {
          handleNavigation(item.router);
        }}
        style={[
          tailwind(
            'flex-row items-center justify-between p-4 mx-1 mb-3 rounded-md bg-slate-100'
          ),
          commonStyle.shadow
        ]}
      >
        <View style={tailwind('flex-row items-center')}>
          <Ionicons
            name="alert-circle-outline"
            style={tailwind('text-yellow-600')}
            size={32}
          />
          <Text style={tailwind('text-lg ml-5')}>{item.victimName}</Text>
        </View>
        <Ionicons name="chevron-forward-outline" color="black" size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default Option;

/* import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View
} from 'react-native';
import { useTailwind } from 'tailwind-rn';

interface Props extends TouchableOpacityProps {
  label: string;
}

const Option: React.FC<Props> = ({ label, ...rest }) => {
  const tailwind = useTailwind();
  return (
    <TouchableOpacity style={tailwind('mt-1')} {...rest}>
      <View
        style={tailwind(
          'flex flex-row border-b border-gray-300 items-center py-4 '
        )}
      >
        <View style={tailwind('rounded-full bg-slate-300 p-2')}>
          <Ionicons name="person-outline" size={20} />
        </View>
        <Text style={tailwind('text-lg p-2')}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Option; */
