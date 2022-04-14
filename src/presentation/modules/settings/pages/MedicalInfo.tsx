import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import React from 'react';
import { Switch, Text, View, FlatList } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';

import { Validation } from '@/presentation/protocols';
import BaseListItem from '@/presentation/shared/components/BaseListItem';
import Container from '@/presentation/shared/components/Container';
import Button from '@/presentation/shared/components/form/button';
import ButtonOutline from '@/presentation/shared/components/form/buttonOutline';
import Input from '@/presentation/shared/components/form/input';
import { useAuth } from '@/presentation/shared/context/auth';
import useFeedbackMessage from '@/presentation/shared/hooks/useFeedbackMessage';
import useInputState from '@/presentation/shared/hooks/useInputState';

import MedicalEmpty from '../components/MedicalEmpty';

interface Props {
  validation: Validation;
}

const fakeMedicalData = [
  {
    id: '1',
    victimName: 'Tipo sanguineo'
  },
  {
    id: '2',
    victimName: 'Doença respiratoria'
  },
  {
    id: '3',
    victimName: 'Fulano'
  },
  {
    id: '4',
    victimName: 'Fulano'
  },
  {
    id: '5',
    victimName: 'Fulano'
  },
  {
    id: '6',
    victimName: 'Fulano'
  },
  {
    id: '7',
    victimName: 'Fulano'
  },
  {
    id: '8',
    victimName: 'Fulano'
  },
  {
    id: '9',
    victimName: 'Fulano'
  }
];

const MedicalInfo: React.FC<Props> = ({ validation }) => {
  const { signOut } = useAuth();
  const { showSuccess } = useFeedbackMessage();
  const title = useInputState({
    name: 'title'
  });
  const description = useInputState({
    name: 'description'
  });
  const activeVisualization = useInputState({
    name: 'activeVisualization',
    initialValue: true
  });

  const tailwind = useTailwind();

  async function updateUserData() {
    const payload = {
      fullName: fullName.value,
      email: email.value,
      phoneNumber: phoneNumber.value,
      totalVoiceToken: totalVoiceToken.value,
      activeByAccelerometer: activeByAccelerometer.value
    };

    const validate = await validation.validateForm(payload);
    const { valid, errors } = validate;
    if (!valid && errors) {
      fullName.setError(errors);
      email.setError(errors);
      phoneNumber.setError(errors);
      totalVoiceToken.setError(errors);
      activeByAccelerometer.setError(errors);
    } else {
      showSuccess({
        description: 'Dados atualizados com sucesso!'
      });
    }
  }

  return (
    <Container>
      <View style={tailwind('flex-1')}>
        <Text style={tailwind('text-lg font-bold')}>Dados de saúde</Text>
        <Input
          placeholder="Ex.: Tipo sanguíneo"
          label="Título"
          value={title.value}
          onChangeText={title.set}
          error={title.error}
        />
        <Input
          placeholder="Ex.: AB+"
          label="Descrição"
          value={title.value}
          onChangeText={title.set}
          error={title.error}
        />
        <View style={tailwind('flex-row justify-start items-center mb-2')}>
          <Switch
            value={activeVisualization.value}
            onValueChange={activeVisualization.set}
            style={tailwind(' mr-2')}
          />
          <Text style={tailwind('text-sm font-ubuntu')}>
            Visivel somente para o corpo de bombeiros
          </Text>
        </View>
        <Button label="Salvar" onPress={updateUserData}>
          <Ionicons
            name="save-outline"
            size={20}
            style={tailwind('text-white')}
          />
        </Button>
      </View>
      <Container scroll>
        <FlatList
          style={tailwind('mt-2 flex-1')}
          contentContainerStyle={tailwind('justify-center flex-grow')}
          showsVerticalScrollIndicator={false}
          data={fakeMedicalData}
          keyExtractor={(item) => String(item.id)}
          ListEmptyComponent={<MedicalEmpty />}
          renderItem={({ item }) => (
            <BaseListItem itemName={item.victimName}>
              <Ionicons
                name="heart-circle-outline"
                style={tailwind('text-red-600')}
                size={32}
              />
            </BaseListItem>
          )}
        />
      </Container>
    </Container>
  );
};

export default MedicalInfo;
