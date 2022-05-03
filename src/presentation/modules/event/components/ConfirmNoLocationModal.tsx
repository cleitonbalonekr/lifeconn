import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import Button from '@/presentation/shared/components/form/button';

export interface ConfirmNoLocationModalRefProps {
  handleOpenModal(): void;
  handleCloseModal(): void;
}

export interface Props {
  confirmWithoutLocation(): void;
}
const ConfirmNoLocationModal: React.ForwardRefRenderFunction<
  ConfirmNoLocationModalRefProps,
  Props
> = ({ confirmWithoutLocation }, ref) => {
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
  return (
    <Modal visible={visible} transparent>
      <Pressable
        style={tailwind(' flex-1 justify-center items-center  ')}
        onPress={handleCloseModal}
      >
        <View
          style={tailwind('justify-center m-6 bg-white rounded-md p-6  h-64 ')}
        >
          <Text style={tailwind('font-bold text-lg mb-3 text-center')}>
            Atenção!
          </Text>
          <Text style={tailwind('mb-1 text-sm text-center')}>
            Você esta tentando prosseguir sem a localização atual. Isso pode
            dificultar bastante para Corpo de Bombeiros encontrar o acidente.
          </Text>

          <View style={tailwind('flex-row mt-8 justify-between')}>
            <View style={tailwind('mr-1')}>
              <Button label="Cancelar" onPress={handleCloseModal} />
            </View>
            <View style={tailwind('ml-1')}>
              <Button
                type="danger"
                label="Prosseguir sem localização"
                onPress={confirmWithoutLocation}
              />
            </View>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

export default forwardRef(ConfirmNoLocationModal);
