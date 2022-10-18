import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { Contact } from '@/domain/models';
import { RemoveContact } from '@/domain/usecases';
import Container from '@/presentation/shared/components/Container';
import Button from '@/presentation/shared/components/form/button';
import Input from '@/presentation/shared/components/form/input';
import { useAuth } from '@/presentation/shared/context/auth';
import useFeedbackMessage from '@/presentation/shared/hooks/useFeedbackMessage';
import useInputState from '@/presentation/shared/hooks/useInputState';

interface Props {
  removeContact: RemoveContact;
}

const DetailsContact: React.FC<Props> = ({ removeContact }) => {
  const { authUser, saveUserSate } = useAuth();
  const navigation = useNavigation();
  const tailwind = useTailwind();
  const route = useRoute();
  const { showError, showSuccess } = useFeedbackMessage();
  const [loading, setLoading] = useState(false);
  const { phoneNumber, nickname } = route.params as Contact;
  const token = useInputState({
    name: 'token'
  });
  useEffect(() => {
    token.set(phoneNumber);
  }, []);

  async function handleRemoveContact() {
    try {
      setLoading(true);
      const user = await removeContact.remove(phoneNumber, authUser.id);
      saveUserSate(user);
      showSuccess({
        description: 'Contato removido.'
      });
      setLoading(false);
      navigation.goBack();
    } catch (error: any) {
      showError(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <View
        style={tailwind(
          'flex flex-row border-b border-gray-300 items-center py-4 '
        )}
      >
        <View style={tailwind('rounded-full bg-slate-300 p-4')}>
          <Ionicons name="person-outline" size={20} />
        </View>
        <Text style={tailwind('text-lg text-center px-2 font-ubuntu')}>
          {nickname}
        </Text>
      </View>
      <View style={tailwind('mt-8 justify-center')}>
        <Input placeholder="Token" label="Telefone" value={token.value} />
        <Button
          label="Remover"
          type="danger"
          onPress={handleRemoveContact}
          loading={loading}
        >
          <Ionicons
            name="trash-bin-outline"
            size={20}
            style={tailwind('text-white')}
          />
        </Button>
      </View>
    </Container>
  );
};

export default DetailsContact;
