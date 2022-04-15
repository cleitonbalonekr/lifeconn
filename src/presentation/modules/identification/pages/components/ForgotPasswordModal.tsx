/* eslint-disable no-unused-vars */
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Modal, Text, Pressable, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useTailwind } from 'tailwind-rn';

import { ResetPassword } from '@/domain/usecases';
import { Validation } from '@/presentation/protocols';
import Button from '@/presentation/shared/components/form/button';
import Input from '@/presentation/shared/components/form/input';
import useFeedbackMessage from '@/presentation/shared/hooks/useFeedbackMessage';
import useInputState from '@/presentation/shared/hooks/useInputState';

export interface ForgotPasswordModalRefProps {
  handleOpenModal(): void;
  handleCloseModal(): void;
}

interface Props {
  validation: Validation;
  resetPassword: ResetPassword;
}

const ForgotPasswordModal: React.ForwardRefRenderFunction<
  ForgotPasswordModalRefProps,
  Props
> = ({ validation, resetPassword }, ref) => {
  const tailwind = useTailwind();
  const { showSuccess, showError } = useFeedbackMessage();
  const [visible, setVisible] = useState(false);
  const email = useInputState({
    name: 'email'
  });

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

  async function handleResetPassword() {
    try {
      const { valid, errors } = await validation.validateForm({
        email: email.value
      });

      if (!valid && errors) {
        email.setError(errors);
        return;
      }
      await resetPassword.recovery(email.value);
      showSuccess({
        description: 'Email enviado!'
      });
      handleCloseModal();
    } catch (error: any) {
      showError(error);
    }
  }

  return (
    <Modal visible={visible} transparent>
      <Pressable
        style={tailwind(' flex-1 justify-center items-center  ')}
        onPress={handleCloseModal}
      >
        <View
          style={tailwind(
            'justify-center m-6 bg-white rounded-md p-6 w-4/5 h-64 '
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
            value={email.value}
            onChangeText={email.set}
            error={email.error}
          />
          <Button label="Recuperar senha" onPress={handleResetPassword} />
        </View>
      </Pressable>
    </Modal>
  );
};

export default forwardRef(ForgotPasswordModal);
