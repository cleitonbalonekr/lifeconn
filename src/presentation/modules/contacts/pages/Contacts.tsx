import { useNavigation } from '@react-navigation/native';
import React from 'react';

import Header from '@/presentation/modules/contacts/components/header';
import Container from '@/presentation/shared/components/Container';
import Option from '@/presentation/shared/components/form/option';

// import { Container } from './styles';

const Contacts: React.FC = () => {
  const navigation = useNavigation();

  function handleNavigationToDetailContact() {
    navigation.navigate('DetailsContact');
  }
  return (
    <Container scroll>
      <Header />
      <Option label="Fulano 1" onPress={handleNavigationToDetailContact} />
      <Option label="Fulano 2" onPress={handleNavigationToDetailContact} />
      <Option label="Fulano 3" onPress={handleNavigationToDetailContact} />
      <Option label="Fulano 4" onPress={handleNavigationToDetailContact} />
      <Option label="Fulano 4" onPress={handleNavigationToDetailContact} />
      <Option label="Fulano 6" onPress={handleNavigationToDetailContact} />
      <Option label="Fulano 7" onPress={handleNavigationToDetailContact} />
      <Option label="Fulano 8" onPress={handleNavigationToDetailContact} />
      <Option label="Fulano 9" onPress={handleNavigationToDetailContact} />
      <Option label="Fulano 10" onPress={handleNavigationToDetailContact} />
      <Option label="Fulano 11" onPress={handleNavigationToDetailContact} />
      <Option label="Fulano 12" onPress={handleNavigationToDetailContact} />
      <Option label="Fulano 13" onPress={handleNavigationToDetailContact} />
    </Container>
  );
};

export default Contacts;
