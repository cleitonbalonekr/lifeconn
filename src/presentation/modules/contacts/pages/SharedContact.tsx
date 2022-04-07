import React from 'react';
import { View, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useTailwind } from 'tailwind-rn';

import Container from '@/presentation/shared/components/Container';
import Input from '@/presentation/shared/components/form/input';

const SharedContact: React.FC = () => {
  const tailwind = useTailwind();
  const token =
    '123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789';

  return (
    <Container>
      <Text style={tailwind('text-lg text-center')}>
        Escanei o QR code abaixo
      </Text>
      <View style={tailwind('flex-1 justify-center items-center')}>
        <QRCode value={token} size={250} />
      </View>
      <Input placeholder="Token" label="Meu token" value={token} />
      <Text style={tailwind('text-blue-500')}>
        Compartilhar por outros meios
      </Text>
    </Container>
  );
};

export default SharedContact;
