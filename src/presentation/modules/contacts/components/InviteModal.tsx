/* eslint-disable no-unused-vars */
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Modal, Text, Pressable, View, Share } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { PLAY_STORE_LINK } from '@/configs';
import Button from '@/presentation/shared/components/form/button';

export interface InviteModalRefProps {
  handleOpenModal(): void;
  handleCloseModal(): void;
}

const InviteModal: React.ForwardRefRenderFunction<InviteModalRefProps> = (
  _,
  ref
) => {
  const tailwind = useTailwind();

  const [visible, setVisible] = useState(false);

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

  async function handleInviteContact() {
    const playStoreLink = PLAY_STORE_LINK;
    const token = `Olá estou usando o app Lifeconn.\nBaixe o app para você ser meu contato.\n${playStoreLink}`;
    await Share.share({
      message: token
    });
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
          <Text style={tailwind('font-bold text-lg mb-1 text-center')}>
            Atenção
          </Text>
          <Text style={tailwind('my-3 text-sm text-center')}>
            Esse contato ainda não possui uma conta no app. Você pode convida-lo
            através do botão abaixo
          </Text>

          <Button label="Convidar" onPress={handleInviteContact} />
        </View>
      </Pressable>
    </Modal>
  );
};

export default forwardRef(InviteModal);
