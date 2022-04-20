import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { ActivityIndicator, Modal, View } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';

export interface LoadingOverlayRefProps {
  showLoading(): void;
  hideLoading(): void;
}
const LoadingOverlay: React.ForwardRefRenderFunction<LoadingOverlayRefProps> = (
  _,
  ref
) => {
  const tailwind = useTailwind();
  const [visible, setVisible] = useState(false);
  useImperativeHandle(ref, () => {
    return {
      showLoading,
      hideLoading
    };
  });

  const hideLoading = () => {
    setVisible(false);
  };
  const showLoading = () => {
    setVisible(true);
  };
  return (
    <Modal visible={visible} transparent>
      <View
        style={tailwind('flex-1 items-center justify-center bg-transparent')}
      >
        <ActivityIndicator color="#000" size="large" />
      </View>
    </Modal>
  );
};

export default forwardRef(LoadingOverlay);
