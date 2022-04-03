import Icon from '@expo/vector-icons/Feather';
import React, { useRef, useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import logoImg from '@/presentation/shared/assets/logo.png';
import Button from '@/presentation/shared/components/form/button';
import Input from '@/presentation/shared/components/form/input';
import ButtonLink from '@/presentation/shared/components/form/link';

import ForgotPasswordModal, {
  ForgotPasswordModalRefProps
} from './components/ForgotPasswordModal';

const pages: React.FC = () => {
  const forgotPasswordRef = useRef<ForgotPasswordModalRefProps>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const tailwind = useTailwind();

  function handleLogin() {
    console.log('login');
  }
  function handleResetPassword() {
    forgotPasswordRef.current?.handleOpenModal();
  }
  function handleRegister() {
    console.log('register');
  }
  return (
    <ScrollView style={tailwind('px-6')}>
      <ForgotPasswordModal ref={forgotPasswordRef} />
      <View style={tailwind('justify-center items-center mt-2.5')}>
        <Image source={logoImg} style={tailwind('w-80')} resizeMode="contain" />
      </View>
      <Text style={tailwind('text-lg font-semibold')}>Acessar</Text>
      <View>
        <Input
          placeholder="E-mail"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Button label="Entrar" onPress={handleLogin}>
          <Icon name="log-in" size={20} color="white" />
        </Button>
        <ButtonLink label="Esqueci minha senha" onPress={handleResetPassword} />

        <View style={tailwind('border border-gray-300 my-6 ')} />
        <Text style={tailwind('text-lg font-semibold')}>Crie sua conta</Text>
        <Input
          placeholder="E-mail"
          value={registerEmail}
          onChangeText={(text) => setRegisterEmail(text)}
        />
        <Input
          placeholder="Password"
          value={registerPassword}
          onChangeText={(text) => setRegisterPassword(text)}
        />
        <Input
          placeholder="Telefone"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
        />
        <Button label="Cadastrar" type="primary" onPress={handleRegister}>
          <Icon name="user-plus" size={20} color="white" />
        </Button>
      </View>
    </ScrollView>
  );
};

export default pages;
