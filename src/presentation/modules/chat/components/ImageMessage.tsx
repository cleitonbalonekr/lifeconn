import React from 'react';
import { View, Image } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';

interface Props {
  uri: string;
}

const ImageMessage: React.FC<Props> = ({ uri }) => {
  const tailwind = useTailwind();
  return (
    <View style={tailwind('bg-teal-200 rounded-lg p-2 ml-24 mb-2')}>
      <Image
        resizeMode="stretch"
        style={tailwind('w-full h-96 rounded-md')}
        source={{
          uri
        }}
      />
    </View>
  );
};

export default ImageMessage;
