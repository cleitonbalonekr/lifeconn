import Icon from '@expo/vector-icons/Feather';
import React, { useRef } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { Validation } from '@/presentation/protocols';
import logoImg from '@/presentation/shared/assets/logo.png';
import Button from '@/presentation/shared/components/form/button';
import Input from '@/presentation/shared/components/form/input';
import ButtonLink from '@/presentation/shared/components/form/link';
import useInputState from '@/presentation/shared/hooks/useInputState';

import ForgotPasswordModal, {
  ForgotPasswordModalRefProps
} from './components/ForgotPasswordModal';

type Props = {
  validation: Validation;
};

const Login: React.FC<Props> = ({ validation }) => {
  const forgotPasswordRef = useRef<ForgotPasswordModalRefProps>(null);
  const email = useInputState({
    name: 'email'
  });
  const password = useInputState({
    name: 'password'
  });
  const registerEmail = useInputState({
    name: 'email'
  });
  const registerPassword = useInputState({
    name: 'password'
  });
  const phoneNumber = useInputState({
    name: 'phoneNumber'
  });

  const tailwind = useTailwind();

  async function handleLogin() {
    const validate = await validation.validateForm({
      email: email.value,
      password: password.value
    });
    const { valid, errors } = validate;
    if (!valid && errors) {
      email.setError(errors);
      password.setError(errors);
    }
  }
  function handleResetPassword() {
    forgotPasswordRef.current?.handleOpenModal();
  }
  async function handleRegister() {
    const validate = await validation.validateForm({
      email: registerEmail.value,
      password: registerPassword.value,
      phoneNumber: phoneNumber.value
    });
    const { valid, errors } = validate;
    if (!valid && errors) {
      registerEmail.setError(errors);
      registerPassword.setError(errors);
      phoneNumber.setError(errors);
    }
  }
  return (
    <ScrollView
      style={tailwind('px-6 ')}
      contentContainerStyle={tailwind(' pb-6')}
    >
      <ForgotPasswordModal ref={forgotPasswordRef} />
      <View style={tailwind('justify-center items-center mt-2.5')}>
        <Image source={logoImg} style={tailwind('w-80')} resizeMode="contain" />
      </View>
      <Text style={tailwind('text-lg font-semibold')}>Acessar</Text>
      <View>
        <Input
          placeholder="E-mail"
          value={email.value}
          onChangeText={email.set}
          error={email.error}
        />
        <Input
          placeholder="Senha"
          value={password.value}
          onChangeText={password.set}
          error={password.error}
        />
        <Button label="Entrar" onPress={handleLogin}>
          <Icon name="log-in" size={20} color="white" />
        </Button>
        <ButtonLink label="Esqueci minha senha" onPress={handleResetPassword} />

        <View style={tailwind('border border-gray-300 my-6 ')} />
        <Text style={tailwind('text-lg font-semibold')}>Crie sua conta</Text>
        <Input
          placeholder="E-mail"
          value={registerEmail.value}
          onChangeText={registerEmail.set}
          error={registerEmail.error}
        />
        <Input
          placeholder="Senha"
          value={registerPassword.value}
          onChangeText={registerPassword.set}
          error={registerPassword.error}
        />
        <Input
          placeholder="Telefone"
          value={phoneNumber.value}
          onChangeText={phoneNumber.set}
          error={phoneNumber.error}
        />
        <Button label="Cadastrar" type="primary" onPress={handleRegister}>
          <Icon name="user-plus" size={20} color="white" />
        </Button>
      </View>
    </ScrollView>
  );
};

export default Login;
