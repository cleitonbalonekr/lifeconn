import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useTailwind } from 'tailwind-rn';

import ScanCode from '@/presentation/modules/contacts/components/scanCode';
import Container from '@/presentation/shared/components/Container';
import Button from '@/presentation/shared/components/form/button';
import Input from '@/presentation/shared/components/form/input';

// import { Container } from './styles';

const CreateContacts: React.FC = () => {
  const tailwind = useTailwind();
  return (
    <Container>
      <Input placeholder="Nome do contato" label="Nome" />
      <Input placeholder="2211111111" label="Telefone" />
      {/* <ScanCode /> */}
      <Button label="Salvar" onPress={() => {}}>
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
