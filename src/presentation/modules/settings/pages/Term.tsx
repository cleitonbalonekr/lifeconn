/* eslint-disable react/no-unescaped-entities */
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Speech from 'expo-speech';
import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';

import Container from '@/presentation/shared/components/Container';
import Button from '@/presentation/shared/components/form/button';

const Term: React.FC = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation();

  function handleTextVoice() {
    const info = `Atenção aos termos de uso, só aceite se estiver de acordo!
    A aplicação laificom foi desenvolvida com objetivo de auxiliar e facilitar a comunicação com o corpo de bombeiros e familiares em casos de emergência.
    A aplicação foi desenvolvida sem fins lucrativos,
    e sua distribuição deverá ser livre,
    não podendo ser comercializada por terceiros.
    A aplicação utiliza a comunicação com o órgão público do corpo de bombeiros,
    por isso sua utilização está de acordo com o artigo 266 do Decreto nº 2.848 de 24 de Fevereiro de 1891 do Código Penal Brasileiro, 
    aonde está explicito que interromper ou perturbar serviço telegráfico,
    radiotelegráfico ou telefônico, 
    impedir ou dificultar-lhe o restabelecimento pode gerar pena de detenção de um a três anos e multa. 
    Segundo artigo 41 do Decreto nº 3.688 de 03 de Outubro de 1941 da Lei de Contravenções Penais também ressalta que
    Provocar alarma, anunciando desastre ou perigo inexistente,
    ou praticar qualquer ato capaz de produzir pânico ou tumulto pode gerar prisão simples de quinze a seis meses ou multa.
    O usuário só deverá acionar o corpo de bombeiros nos seguintes casos:
    Incêndios em residências, empresas, estruturas e em vegetação.
    Acidentes de trânsito com vítimas.
    Afogamentos.
    Acidentes domésticos (queimaduras, intoxicação, explosões e ferimentos em geral).
    Quedas de plano elevado ou de mesmo nível que resultem em lesões.
    Busca de pessoas.
    Salvamento em ambientes hostis.
    Lesões provenientes de agressão e ataques de animais.
    Ferimentos por arma de fogo e objetos cortantes/perfurantes.
    Emergências com produtos perigosos e combustíveis.
    Desabamentos, soterramentos e deslizamentos.
    Emergências resultantes de vendavais, enchentes, temporais e chuvas de granizo.
    Todo o fornecimento e compartilhamento de dados será de total responsabilidade do usuário.
    A aplicação compartilhará informações pessoais como:
    Informações médicas
    Localização
    Dados pessoais (nome, telefone, email)
    As informações serão compartilhadas com o órgão do corpo de bombeiros obrigatoriamente.
    As informações só serão compartilhadas com familiares se o usuário optar.
    Esses são os termos de utilização, se você estiver de acordo clique no botão eu aceito.
    `;
    Speech.speak(info);
  }
  function handleStopTextVoice() {
    Speech.stop();
  }

  function handleNavigateToHome() {
    handleStopTextVoice();
    navigation.navigate('Home');
  }

  useEffect(() => {
    handleTextVoice();
  }, []);

  return (
    <Container>
      <Container scroll>
        <Text style={tailwind('mb-2 mt-2 text-lg font-bold text-center')}>
          TERMOS DE USO
        </Text>
        <Ionicons
          name="volume-mute"
          size={20}
          style={tailwind('text-black')}
          onPress={handleStopTextVoice}
        />
        <Text style={tailwind('mb-2 text-center font-bold')}>
          Atenção aos termos de uso!
        </Text>
        <Text>
          A aplicação lifeconn foi desenvolvida com objetivo de auxiliar e
          facilitar a comunicação com o corpo de bombeiros e familiares em casos
          de emergência.
        </Text>
        <Text>
          A aplicação foi desenvolvida sem fins lucrativos, e sua distribuição
          deverá ser livre, não podendo ser comercializada por terceiros.
        </Text>
        <Text>
          A aplicação utiliza a comunicação com o órgão público do corpo de
          bombeiros, por isso sua utilização está de acordo com o{' '}
          <Text style={tailwind('mb-2 text-center font-bold')}>
            artigo 266 do Decreto nº 2.848 de 24 de Fevereiro de 1891 do Código
            Penal Brasileiro, aonde está explicito que interromper ou perturbar
            serviço telegráfico, radiotelegráfico ou telefônico, impedir ou
            dificultar-lhe o restabelecimento pode gerar pena de detenção de um
            a três anos e multa. Segundo artigo 41 do Decreto nº 3.688 de 03 de
            Outubro de 1941 da Lei de Contravenções Penais também ressalta que,
            provocar alarma, anunciando desastre ou perigo inexistente, ou
            praticar qualquer ato capaz de produzir pânico ou tumulto pode gerar
            prisão simples de quinze a seis meses ou multa.
          </Text>
        </Text>
        <Text>
          O usuário só deverá acionar o corpo de bombeiros nos seguintes casos:
        </Text>
        <Text>
          * Incêndios em residências, empresas, estruturas e em vegetação.
        </Text>
        <Text>* Acidentes de trânsito com vítimas.</Text>
        <Text>* Afogamentos.</Text>
        <Text>
          * Acidentes domésticos (queimaduras, intoxicação, explosões e
          ferimentos em geral).
        </Text>
        <Text>
          * Quedas de plano elevado ou de mesmo nível que resultem em lesões.
        </Text>
        <Text>* Busca de pessoas.</Text>
        <Text>* Salvamento em ambientes hostis.</Text>
        <Text>* Lesões provenientes de agressão e ataques de animais.</Text>
        <Text>
          * Ferimentos por arma de fogo e objetos cortantes/perfurantes.
        </Text>
        <Text>* Emergências com produtos perigosos e combustíveis.</Text>
        <Text>* Desabamentos, soterramentos e deslizamentos.</Text>
        <Text>
          * Emergências resultantes de vendavais, enchentes, temporais e chuvas
          de granizo.
        </Text>
        <Text>
          Todo o fornecimento e compartilhamento de dados será de total
          responsabilidade do usuário.
        </Text>
        <Text>A aplicação compartilhará informações pessoais como:</Text>
        <Text>* Informações médicas</Text>
        <Text>* Localização</Text>
        <Text>* Dados pessoais (nome, telefone, e-mail)</Text>
        <Text>
          As informações serão compartilhadas com o órgão do corpo de bombeiros
          obrigatoriamente.
        </Text>
        <Text>
          As informações só serã compartilhadas com familiares se o usuário
          optar.
        </Text>
      </Container>
      <Button label="Confirmar" type="primary" onPress={handleNavigateToHome}>
        <Ionicons
          name="checkmark-done"
          size={20}
          style={tailwind('text-white')}
        />
      </Button>
    </Container>
  );
};

export default Term;
