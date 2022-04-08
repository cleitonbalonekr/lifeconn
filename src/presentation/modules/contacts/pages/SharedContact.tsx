import React from 'react';
import { View, Text, Dimensions, Share } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useTailwind } from 'tailwind-rn';

import Container from '@/presentation/shared/components/Container';
import Input from '@/presentation/shared/components/form/input';
import ButtonLink from '@/presentation/shared/components/form/link';

const QR_CODE_SIZE = Dimensions.get('window').height * 0.5;

const SharedContact: React.FC = () => {
  const tailwind = useTailwind();
  const token =
    '123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789';
  async function handleShare() {
    await Share.share({
      message: token
    });
  }

  return (
    <Container>
      <View style={tailwind('flex-1  justify-around')}>
        <View style={tailwind('justify-center items-center')}>
          <Text style={tailwind('text-lg text-center mb-4')}>
            Escanei o QR code abaixo
          </Text>
          <QRCode value={token} size={QR_CODE_SIZE} />
        </View>
        <View style={tailwind(' justify-center items-center')}>
          <Input placeholder="Token" label="Meu token" value={token} />
          <ButtonLink
            label="Compartilhar por outros meios"
            onPress={handleShare}
          />
        </View>
      </View>
    </Container>
  );
};

export default SharedContact;
