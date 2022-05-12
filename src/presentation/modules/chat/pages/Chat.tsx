import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Image, Keyboard, Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';

import { Message } from '@/domain/models';
import {
  CreateMessage,
  LoadCallMessage,
  StoreFile,
  SubscribeToMessages
} from '@/domain/usecases';
import Container from '@/presentation/shared/components/Container';
import Button from '@/presentation/shared/components/form/button';
import Input from '@/presentation/shared/components/form/input';
import LoadingOverlay, {
  LoadingOverlayRefProps
} from '@/presentation/shared/components/LoadingOverlay';
import { useAuth } from '@/presentation/shared/context/auth';
import useFeedbackMessage from '@/presentation/shared/hooks/useFeedbackMessage';
import useInputState from '@/presentation/shared/hooks/useInputState';

import ImageMessage from '../components/ImageMessage';
import MediaAttach, {
  MediaAttachModalRefProps
} from '../components/MediaAttach';
import MessageContent from '../components/MessageContent';

interface Props {
  sendMessage: CreateMessage;
  subscribeToMessages: SubscribeToMessages;
  loadMessages: LoadCallMessage;
  storeFile: StoreFile;
}

const Chat: React.FC<Props> = ({
  sendMessage,
  subscribeToMessages,
  loadMessages,
  storeFile
}) => {
  const { authUser } = useAuth();
  const route = useRoute();
  const tailwind = useTailwind();
  const messageContent = useInputState({
    name: 'content'
  });
  const { callId } = route.params as { callId: string };
  const [messages, setMessages] = useState<Message[]>([]);
  const loadingOverlayRef = useRef<LoadingOverlayRefProps>(null);
  const mediaAttachRef = useRef<MediaAttachModalRefProps>(null);
  const { showError } = useFeedbackMessage();

  async function loadInitialMessages() {
    try {
      loadingOverlayRef.current?.showLoading();
      const initialMessages = await loadMessages.load(callId);
      setMessages(initialMessages);
    } catch (error: any) {
      showError(error);
    } finally {
      loadingOverlayRef.current?.hideLoading();
    }
  }

  async function handleSendMessage() {
    try {
      const payload = {
        isPhoto: false,
        content: messageContent.value,
        from: authUser.id
      };
      await sendMessage.create(payload, callId);
      messageContent.set('');
    } catch (error: any) {
      showError(error);
    }
  }

  function handleOpenMediaOption() {
    mediaAttachRef.current?.handleToggleModal();
  }

  const formatDate = (date: Date) => {
    return format(date, 'dd/MM/yyyy HH:mm');
  };

  const onMessage = (message: Message[]) => {
    setMessages(message);
  };
  const onMessageError = (error: any) => {
    showError('Falha ao receber mensagens');
  };

  useEffect(() => {
    loadInitialMessages();
    const unsubscribe = subscribeToMessages.subscribe({
      callId,
      successCallback: onMessage,
      errorCallback: onMessageError
    });
    return () => unsubscribe();
  }, []);

  return (
    <Container>
      <MediaAttach
        sendMessage={sendMessage}
        storeFile={storeFile}
        callId={callId}
        ref={mediaAttachRef}
        loadingOverlayRef={loadingOverlayRef}
      />
      <LoadingOverlay ref={loadingOverlayRef} />
      <View style={tailwind('flex-1')}>
        <Text style={tailwind('font-bold mb-12 italic')}>
          <Ionicons name="person-outline" size={20} />
          Você está conversando com um atendente do corpo de Bombeiros!
        </Text>
        <FlatList
          style={tailwind('flex-grow-0 ')}
          data={messages}
          inverted
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <>
              {item.isPhoto ? (
                <ImageMessage uri={item.content} />
              ) : (
                <MessageContent
                  content={item.content}
                  createdAt={item.createdAt}
                  received={item.from !== authUser.id}
                />
              )}
            </>
          )}
        />
      </View>
      <View style={tailwind('flex-row justify-center items-center')}>
        <View style={tailwind('flex-1')}>
          <Input
            placeholder="Escrever mensagem"
            value={messageContent.value}
            onChangeText={messageContent.set}
          />
        </View>
        <Ionicons
          name="attach-outline"
          size={36}
          style={tailwind('text-black')}
          onPress={handleOpenMediaOption}
        />
        <View style={tailwind('items-center justify-center ml-1 ')}>
          <Button onPress={handleSendMessage}>
            <Ionicons name="send" size={20} style={tailwind('text-white')} />
          </Button>
        </View>
      </View>
    </Container>
  );
};

export default Chat;
