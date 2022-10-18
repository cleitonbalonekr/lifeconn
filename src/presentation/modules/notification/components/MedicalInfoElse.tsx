import React from 'react';
import { Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';

import { commonStyle } from '@/presentation/shared/styles/commonStyle';

interface Props {
  item: {
    id: string;
    title: string;
    value: string;
  };
}

const MedicalInfoElse: React.FC<Props> = ({ item }) => {
  const tailwind = useTailwind();

  return (
    <View style={tailwind('pb-1 overflow-hidden ')}>
      <View
        style={[
          tailwind(
            ' items-center justify-center p-4 mx-1 mb-3 rounded bg-red-400 w-48 '
          ),
          commonStyle.shadow
        ]}
      >
        <Text style={tailwind('w-28 text-center font-ubuntu-bold')}>
          {item.title}
        </Text>
        <Text
          numberOfLines={3}
          style={tailwind(' text-justify font-ubuntu-medium')}
        >
          {item.value}
        </Text>
      </View>
    </View>
  );
};

export default MedicalInfoElse;
