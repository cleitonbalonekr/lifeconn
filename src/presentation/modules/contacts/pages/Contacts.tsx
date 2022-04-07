import React from 'react';

import Header from '@/presentation/modules/contacts/components/header';
import Container from '@/presentation/shared/components/Container';
import Option from '@/presentation/shared/components/form/option';

// import { Container } from './styles';

const Contacts: React.FC = () => {
  return (
    <Container scroll>
      <Header />
      <Option label="Fulano 1" onPress={() => {}} />
      <Option label="Fulano 2" onPress={() => {}} />
      <Option label="Fulano 3" onPress={() => {}} />
      <Option label="Fulano 4" onPress={() => {}} />
      <Option label="Fulano 4" onPress={() => {}} />
      <Option label="Fulano 6" onPress={() => {}} />
      <Option label="Fulano 7" onPress={() => {}} />
      <Option label="Fulano 8" onPress={() => {}} />
      <Option label="Fulano 9" onPress={() => {}} />
      <Option label="Fulano 10" onPress={() => {}} />
      <Option label="Fulano 11" onPress={() => {}} />
      <Option label="Fulano 12" onPress={() => {}} />
      <Option label="Fulano 13" onPress={() => {}} />
    </Container>
  );
};

export default Contacts;
