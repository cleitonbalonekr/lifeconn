import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View
} from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';

import { commonStyle } from '@/presentation/shared/styles/commonStyle';

interface Props extends TouchableOpacityProps {
  itemName: string;
}

const BaseListItem: React.FC<Props> = ({ itemName, children, ...rest }) => {
  const tailwind = useTailwind();

  return (
    <View style={tailwind('pb-1 overflow-hidden ')}>
      <TouchableOpacity
        style={[
          tailwind(
            'flex-row items-center justify-between p-4 mx-1 mb-3 rounded-md bg-slate-100'
          ),
          commonStyle.shadow
        ]}
        {...rest}
      >
        <View style={tailwind('flex-row items-center')}>
          {children}
          <Text style={tailwind('text-lg ml-5 font-ubuntu')}>{itemName}</Text>
        </View>
        <Ionicons name="chevron-forward-outline" color="black" size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default BaseListItem;
