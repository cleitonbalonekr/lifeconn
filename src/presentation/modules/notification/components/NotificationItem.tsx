import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';

import { commonStyle } from '@/presentation/shared/styles/commonStyle';

type Item = {
  victimName: string;
  id: string;
};
interface Props {
  item: Item;
}

const NotificationItem: React.FC<Props> = ({ item }) => {
  const tailwind = useTailwind();
  function handleNavigateToDetails() {}
  return (
    <View style={tailwind('pb-1 overflow-hidden ')}>
      <TouchableOpacity
        onPress={handleNavigateToDetails}
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

export default NotificationItem;
