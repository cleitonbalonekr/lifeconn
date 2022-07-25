import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';

import { Validation } from '@/presentation/protocols';
import Container from '@/presentation/shared/components/Container';
import Input from '@/presentation/shared/components/form/input';
import useInputState from '@/presentation/shared/hooks/useInputState';

import Header from '../components/Header';
import HelpButton from '../components/HelpButton';

interface Props {
  validation: Validation;
}

const HelpSomeoneElse: React.FC<Props> = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation();
  const fullName = useInputState({
    name: 'fullName'
  });
  const phoneNumber = useInputState({
    name: 'phoneNumber'
  });
  function handleRequireHelp() {
    const data = {
      phoneNumber: phoneNumber.value,
      fullName: fullName.value
    };
    navigation.navigate('Event', {
      fromHelpSomeoneElse: true,
      victim: { ...data }
    });
  }
  return (
    <Container>
      <Header from="help" />
      <View style={tailwind('flex-1 mt-3 ')}>
        <Text
          style={tailwind(
            'mb-2 text-justify text-lg text-yellow-700 font-ubuntu'
          )}
        >
          Verifique o celular da vítima, caso possível. Se ela for uma usuária
          da aplicação, uma notificação com o nome e o telefone deverá ser
          exibida. Caso contrário deixe o formulário em branco.
        </Text>
        <Input
          placeholder="Digite o nome da vítima"
          label="Nome"
          value={fullName.value}
          onChangeText={fullName.set}
          error={fullName.error}
        />
        <Input
          placeholder="Telefone da vítima"
          label="telefone"
          value={phoneNumber.value}
          onChangeText={phoneNumber.set}
          error={phoneNumber.error}
        />
        <HelpButton onPress={handleRequireHelp} />
      </View>
    </Container>
  );
};

export default HelpSomeoneElse;
