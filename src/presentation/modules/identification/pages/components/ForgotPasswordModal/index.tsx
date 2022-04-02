/* eslint-disable no-unused-vars */
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Modal, Text, TouchableOpacity, Pressable, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import Button from '@/presentation/shared/components/form/button';
import Input from '@/presentation/shared/components/form/input';

export interface ForgotPasswordModalRefProps {
  handleOpenModal(): void;
  handleCloseModal(): void;
}

const ForgotPasswordModal: React.ForwardRefRenderFunction<
  ForgotPasswordModalRefProps
> = (_, ref) => {
  const tailwind = useTailwind();
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');

  useImperativeHandle(ref, () => {
    return {
      handleOpenModal,
      handleCloseModal
    };
  });

  const handleCloseModal = () => {
    setVisible(false);
  };
  const handleOpenModal = () => {
    setVisible(true);
  };

  function resetPassword() {
    console.log('resetPassword', email);
  }

  return (
    <Modal visible={visible} transparent>
      <Pressable
        style={tailwind(' flex-1 justify-center items-center  ')}
        onPress={handleCloseModal}
      >
        <View
          style={tailwind(
            'justify-center m-6 bg-white rounded-md p-6 w-4/5 h-56 '
          )}
        >
          <Text style={tailwind('font-bold text-lg mb-3 text-center')}>
            Vamos recuperar sua senha
          </Text>
          <Text style={tailwind('mb-1 text-sm text-center')}>
            Enviaremos para seu email um link para você recuperar a senha.
          </Text>
          <Input
            placeholder="seuemail@example.com"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Button label="Recuperar senha" onPress={resetPassword} />
        </View>
      </Pressable>
    </Modal>
  );
};

export default forwardRef(ForgotPasswordModal);
