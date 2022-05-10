import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import React, { useState } from 'react';
import { Switch, Text, TouchableOpacity, View } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';

import { LogoutUser, UpdateUserInfo } from '@/domain/usecases';
import { Validation } from '@/presentation/protocols';
import Container from '@/presentation/shared/components/Container';
import Button from '@/presentation/shared/components/form/button';
import ButtonOutline from '@/presentation/shared/components/form/buttonOutline';
import Input from '@/presentation/shared/components/form/input';
import ButtonLink from '@/presentation/shared/components/form/link';
import { useAuth } from '@/presentation/shared/context/auth';
import useFeedbackMessage from '@/presentation/shared/hooks/useFeedbackMessage';
import useInputState from '@/presentation/shared/hooks/useInputState';
import { toggleRegisterBackgroundService } from '@/presentation/shared/services/backgroundServices';

interface Props {
  validation: Validation;
  updateUserInfo: UpdateUserInfo;
  logoutUser: LogoutUser;
}

const Settings: React.FC<Props> = ({
  validation,
  updateUserInfo,
  logoutUser
}) => {
  const { signOut, authUser, saveUserSate } = useAuth();
  const tailwind = useTailwind();
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useFeedbackMessage();
  const navigation = useNavigation();
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

  useState(() => {
    fullName.set(authUser.fullName);
    email.set(authUser.email);
    phoneNumber.set(authUser.phoneNumber);
    totalVoiceToken.set(authUser.totalVoiceToken);
    activeByAccelerometer.set(authUser.impactActivation);
  });

  async function updateUserData() {
    try {
      setLoading(true);
      const payload = {
        fullName: fullName.value,
        email: email.value,
        phoneNumber: phoneNumber.value,
        totalVoiceToken: totalVoiceToken.value,
        impactActivation: activeByAccelerometer.value || false
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
        const updatedUser = await updateUserInfo.update(payload, authUser.id);
        saveUserSate(updatedUser);
        toggleRegisterBackgroundService(!activeByAccelerometer.value);
        showSuccess({
          description: 'Dados atualizados com sucesso!'
        });
      }
    } catch (error: any) {
      showError(error);
    } finally {
      setLoading(false);
    }
  }

  function handleOpenTotalVoice() {
    const url = `https://voice-app.zenvia.com/painel/login.php`;
    Linking.openURL(url);
  }
  function handleNavigateToMedicalInfo() {
    navigation.navigate('MedicalInfo');
  }
  function handleNavigateToAdvanced() {
    navigation.navigate('Advanced');
  }
  function handleLogoutUser() {
    logoutUser.signOut();
    signOut();
  }

  function handleNavigateToUseTerms() {
    navigation.navigate('Term');
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
        <View style={tailwind('my-3')}>
          <View style={tailwind('flex-1 mb-1')}>
            <ButtonOutline
              label="Plataforma TotalVoice"
              type="warning"
              onPress={handleOpenTotalVoice}
            >
              <Ionicons
                name="link"
                size={20}
                style={tailwind('text-yellow-600')}
              />
            </ButtonOutline>
          </View>
          <View style={tailwind('flex-1 mt-1')}>
            <ButtonOutline
              label="Informações médicas"
              type="primary"
              onPress={handleNavigateToMedicalInfo}
            >
              <Ionicons
                name="heart-outline"
                size={20}
                style={tailwind('text-blue-600')}
              />
            </ButtonOutline>
          </View>
        </View>
        <View
          style={tailwind('flex-1 flex-row justify-between items-center my-3')}
        >
          <View style={tailwind('flex-1 flex-row items-center')}>
            <Switch
              value={activeByAccelerometer.value}
              onValueChange={activeByAccelerometer.set}
              style={tailwind(' mr-2')}
            />
            <Text style={tailwind('text-lg font-ubuntu')}>
              Ativação por impacto
            </Text>
          </View>
          {activeByAccelerometer.value && (
            <TouchableOpacity
              style={tailwind('items-center')}
              onPress={handleNavigateToAdvanced}
            >
              <FontAwesome5 name="cog" size={20} />
              <Text style={tailwind('text-sm font-ubuntu')}>Avançado</Text>
            </TouchableOpacity>
          )}
        </View>

        <Button label="Salvar" onPress={updateUserData} loading={loading}>
          <Ionicons
            name="save-outline"
            size={20}
            style={tailwind('text-white')}
          />
        </Button>
      </View>
      <View style={tailwind('mt-3 items-end')}>
        <ButtonLink label="Termos de uso" onPress={handleNavigateToUseTerms} />
      </View>
      <View style={tailwind('mt-5 items-start')}>
        <Button label="Sair" type="danger" onPress={handleLogoutUser}>
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
