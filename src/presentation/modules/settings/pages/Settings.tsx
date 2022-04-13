import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import React from 'react';
import { Switch, Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';

import { Validation } from '@/presentation/protocols';
import Container from '@/presentation/shared/components/Container';
import Button from '@/presentation/shared/components/form/button';
import Input from '@/presentation/shared/components/form/input';
import { useAuth } from '@/presentation/shared/context/auth';
import useFeedbackMessage from '@/presentation/shared/hooks/useFeedbackMessage';
import useInputState from '@/presentation/shared/hooks/useInputState';

interface Props {
  validation: Validation;
}

const Settings: React.FC<Props> = ({ validation }) => {
  const { signOut } = useAuth();
  const { showSuccess } = useFeedbackMessage();
  const email = useInputState({
    name: 'email'
  });
  const fullName = useInputState({
    name: 'fullName'
  });
  const phoneNumber = useInputState({
    name: 'phoneNumber'
  });
  const totalVoiceToken = useInputState({
    name: 'totalVoiceToken'
  });
  const activeByAccelerometer = useInputState({
    name: 'activeByAccelerometer',
    initialValue: false
  });

  const tailwind = useTailwind();

  async function updateUserData() {
    const payload = {
      fullName: fullName.value,
      email: email.value,
      phoneNumber: phoneNumber.value,
      totalVoiceToken: totalVoiceToken.value,
      activeByAccelerometer: activeByAccelerometer.value
    };

    const validate = await validation.validateForm(payload);
    const { valid, errors } = validate;
    if (!valid && errors) {
      fullName.setError(errors);
      email.setError(errors);
      phoneNumber.setError(errors);
      totalVoiceToken.setError(errors);
      activeByAccelerometer.setError(errors);
    } else {
      showSuccess({
        description: 'Dados atualizados com sucesso!'
      });
    }
  }

  function handleOpenTotalVoice() {
    const url = `https://voice-app.zenvia.com/painel/login.php`;

    Linking.openURL(url);
  }

  return (
    <Container scroll>
      <View style={tailwind('flex-1')}>
        <Text style={tailwind('text-lg font-bold')}>Meus dados</Text>
        <Input
          placeholder="Seu nome completo"
          label="Nome"
          value={fullName.value}
          onChangeText={fullName.set}
          error={fullName.error}
        />
        <Input
          placeholder="example@gmail.com"
          label="Email"
          value={email.value}
          onChangeText={email.set}
          error={email.error}
        />
        <Input
          placeholder="xxxxxxx"
          label="Telefone"
          value={phoneNumber.value}
          onChangeText={phoneNumber.set}
          error={phoneNumber.error}
        />
        <Input
          placeholder="Seu token TotalVoice"
          label="Token"
          value={totalVoiceToken.value}
          onChangeText={totalVoiceToken.set}
          error={totalVoiceToken.error}
        />
        <Button
          label="Plataforma TotalVoice"
          type="warning"
          onPress={handleOpenTotalVoice}
        >
          <Ionicons name="link" size={20} style={tailwind('text-white')} />
        </Button>
        <View
          style={tailwind('flex-1 flex-row justify-start items-center mb-2')}
        >
          <Switch
            value={activeByAccelerometer.value}
            onValueChange={activeByAccelerometer.set}
            style={tailwind(' mr-2')}
          />
          <Text style={tailwind('text-lg font-ubuntu')}>
            Ativação por impacto
          </Text>
        </View>
        <Button label="Salvar" onPress={updateUserData}>
          <Ionicons
            name="save-outline"
            size={20}
            style={tailwind('text-white')}
          />
        </Button>
      </View>
      <View style={tailwind('mt-5 items-start')}>
        <Button label="Sair" type="danger" onPress={signOut}>
          <Ionicons
            name="log-out-outline"
            size={20}
            style={tailwind('text-white')}
          />
        </Button>
      </View>
      <View style={tailwind('flex-1 justify-end ')}>
        <Text
          style={tailwind(
            ' font-semibold text-center text-lg font-ubuntu-medium'
          )}
        >
          v1.0-beta
        </Text>
      </View>
    </Container>
  );
};

export default Settings;
