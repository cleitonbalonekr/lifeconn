import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { MotiView } from 'moti';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { CreateMessage } from '@/domain/usecases';
import { useAuth } from '@/presentation/shared/context/auth';
import useFeedbackMessage from '@/presentation/shared/hooks/useFeedbackMessage';

export interface MediaAttachModalRefProps {
  handleOpenModal(): void;
  handleCloseModal(): void;
  handleToggleModal(): void;
}

interface Props {
  sendMessage: CreateMessage;
  callId: string;
}

const MediaAttach: React.ForwardRefRenderFunction<
  MediaAttachModalRefProps,
  Props
> = ({ sendMessage, callId }, ref) => {
  const tailwind = useTailwind();
  const { authUser } = useAuth();
  const { showError } = useFeedbackMessage();
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      handleOpenModal,
      handleCloseModal,
      handleToggleModal
    };
  });

  const handleOpenCamera = async () => {
    const response = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0
    });
    console.log('launchCameraAsync', response);
  };
  const handleOpenGallery = async () => {
    const response = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0
    });
    console.log('launchImageLibraryAsync', response);
  };

  async function handleSendMessage(messageUrl: string) {
    try {
      const payload = {
        isPhoto: true,
        content: messageUrl,
        from: authUser.id
      };
      await sendMessage.create(payload, callId);
    } catch (error: any) {
      showError(error);
    }
  }

  const handleCloseModal = () => {
    setVisible(false);
  };
  const handleToggleModal = () => {
    setVisible((prev) => !prev);
  };
  const handleOpenModal = () => {
    setVisible(true);
  };
  return (
    <Modal visible={visible} transparent>
      <Pressable onPress={handleCloseModal} style={tailwind('flex-1')}>
        <MotiView
          from={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: 'timing',
            duration: 350,
            scale: {
              type: 'spring',
              delay: 80
            }
          }}
          style={tailwind('flex-1 items-center justify-end mb-16')}
        >
          <View
            style={tailwind(
              'flex-row justify-around m-6 bg-white rounded-md p-6 w-3/5 h-28 '
            )}
          >
            <TouchableOpacity
              style={tailwind('flex items-center')}
              onPress={handleOpenCamera}
            >
              <View style={tailwind('bg-red-600 rounded-full px-3 py-2.5')}>
                <Ionicons name="camera" size={26} color="white" />
              </View>
              <Text style={tailwind('font-ubuntu-medium')}>Câmera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tailwind('flex items-center ')}
              onPress={handleOpenGallery}
            >
              <View style={tailwind('bg-yellow-600 rounded-full px-3 py-2.5')}>
                <Ionicons name="albums" size={26} color="white" />
              </View>
              <Text style={tailwind('font-ubuntu-medium')}>Galeria</Text>
            </TouchableOpacity>
          </View>
        </MotiView>
      </Pressable>
    </Modal>
  );
};

export default forwardRef(MediaAttach);
