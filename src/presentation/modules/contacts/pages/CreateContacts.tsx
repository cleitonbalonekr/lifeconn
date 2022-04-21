import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useTailwind } from 'tailwind-rn';

import { AddContact } from '@/domain/usecases';
import { Validation } from '@/presentation/protocols';
import Container from '@/presentation/shared/components/Container';
import Button from '@/presentation/shared/components/form/button';
import Input from '@/presentation/shared/components/form/input';
import { useAuth } from '@/presentation/shared/context/auth';
import useFeedbackMessage from '@/presentation/shared/hooks/useFeedbackMessage';
import useInputState from '@/presentation/shared/hooks/useInputState';

interface Props {
  addContact: AddContact;
  validation: Validation;
}

const CreateContacts: React.FC<Props> = ({ addContact, validation }) => {
  const tailwind = useTailwind();
  const [loading, setLoading] = useState(false);
  const phoneNumber = useInputState({
    name: 'phoneNumber'
  });
  const nickname = useInputState({
    name: 'fullName'
  });
  const { showError, showSuccess } = useFeedbackMessage();
  const { authUser, saveUserSate } = useAuth();
  async function handleAddContact() {
    try {
      setLoading(true);
      const payload = {
        phoneNumber: phoneNumber.value,
        nickname: nickname.value
      };
      const validate = await validation.validateForm({
        phoneNumber: phoneNumber.value,
        fullName: nickname.value
      });
      const { valid, errors } = validate;

      if (!valid && errors) {
        phoneNumber.setError(errors);
        nickname.setError(errors);
        return;
      }

      const { user, existentContact } = await addContact.add(
        payload,
        authUser.id
      );
      saveUserSate(user);

      showSuccess({
        description: 'Contato adicionado com sucesso'
      });
    } catch (error: any) {
      showError(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Container>
      <Input
        placeholder="Nome do contato"
        label="Nome"
        value={nickname.value}
        onChangeText={nickname.set}
        error={nickname.error}
      />
      <Input
        placeholder="2211111111"
        label="Telefone"
        value={phoneNumber.value}
        onChangeText={phoneNumber.set}
        error={phoneNumber.error}
      />

      <Button label="Salvar" onPress={handleAddContact} loading={loading}>
        <Ionicons
          name="save-outline"
          size={20}
          style={tailwind('text-white')}
        />
      </Button>
    </Container>
  );
};

export default CreateContacts;
