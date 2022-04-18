import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import React, { useState } from 'react';
import { Switch, Text, View, FlatList } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';

import { MedicalData } from '@/domain/models';
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
    title: 'Tipo sanguíneo',
    description: 'O+',
    onlyOrganization: false
  },
  {
    id: '2',
    title: 'Doença respiratória',
    description: 'Rinite alérgica',
    onlyOrganization: true
  }
];

const MedicalInfo: React.FC<Props> = ({ validation }) => {
  const { authUser } = useAuth();
  const { showSuccess } = useFeedbackMessage();
  const [isOnEditMode, setIsOnEditMode] = useState(false);
  const medicalDataId = useInputState({
    name: 'medicalDataId'
  });
  const title = useInputState({
    name: 'title'
  });
  const description = useInputState({
    name: 'description'
  });
  const onlyOrganization = useInputState({
    name: 'onlyOrganization',
    initialValue: true
  });

  const tailwind = useTailwind();

  async function handleCreateMedicalInfo() {
    const payload = {
      id: medicalDataId.value,
      title: title.value,
      description: description.value
    };

    const validate = await validation.validateForm(payload);
    const { valid, errors } = validate;
    if (!valid && errors) {
      title.setError(errors);
      description.setError(errors);
    } else {
      showSuccess({
        description: 'Informação salva com sucesso!'
      });
    }
  }
  async function handleUpdateMedicalInfo() {
    const payload = {
      title: title.value,
      description: description.value
    };

    const validate = await validation.validateForm(payload);
    const { valid, errors } = validate;
    if (!valid && errors) {
      title.setError(errors);
      description.setError(errors);
    } else {
      showSuccess({
        description: 'Informação salva com sucesso!'
      });
    }
  }
  function handleDeleteMedicalInfo() {
    setIsOnEditMode(false);
  }
  function handleChooseItem(item: MedicalData) {
    setIsOnEditMode(true);
    title.set(item.title);
    description.set(item.description);
    medicalDataId.set(item.id);
    onlyOrganization.set(item.onlyOrganization);
  }
  function handleExitEditMode() {
    setIsOnEditMode(false);
    title.set('');
    description.set('');
    medicalDataId.set('');
    onlyOrganization.set(false);
  }

  return (
    <Container>
      <View style={tailwind('flex-row justify-between items-center')}>
        <Text style={tailwind('text-lg font-ubuntu-bold')}>Dados de saúde</Text>
        {isOnEditMode && (
          <Ionicons
            name="trash"
            size={24}
            style={tailwind('text-red-500')}
            onPress={handleDeleteMedicalInfo}
          />
        )}
      </View>
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
        value={description.value}
        onChangeText={description.set}
        error={description.error}
      />
      <View style={tailwind('flex-row justify-start items-center my-3')}>
        <Switch
          value={onlyOrganization.value}
          onValueChange={onlyOrganization.set}
          style={tailwind(' mr-2')}
        />
        <Text style={tailwind('text-sm font-ubuntu')}>
          Visível somente para o corpo de bombeiros
        </Text>
      </View>
      <View style={tailwind('mb-3')}>
        {isOnEditMode ? (
          <View style={tailwind('flex-row justify-between')}>
            <View style={tailwind('flex-1 mr-2')}>
              <Button label="Salvar" onPress={handleUpdateMedicalInfo}>
                <Ionicons
                  name="save-outline"
                  size={20}
                  style={tailwind('text-white')}
                />
              </Button>
            </View>
            <View style={tailwind('flex-1 ml-2')}>
              <Button
                label="Cancelar"
                type="warning"
                onPress={handleExitEditMode}
              >
                <Ionicons
                  name="close-circle-outline"
                  size={20}
                  style={tailwind('text-white')}
                />
              </Button>
            </View>
          </View>
        ) : (
          <Button label="Cadastrar" onPress={handleCreateMedicalInfo}>
            <Ionicons
              name="save-outline"
              size={20}
              style={tailwind('text-white')}
            />
          </Button>
        )}
      </View>
      <FlatList
        style={tailwind('mt-2 flex-1')}
        contentContainerStyle={tailwind('flex-grow')}
        showsVerticalScrollIndicator={false}
        data={fakeMedicalData}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={<MedicalEmpty />}
        renderItem={({ item }) => (
          <BaseListItem
            itemName={item.title}
            onPress={() => handleChooseItem(item)}
          >
            <Ionicons
              name="heart-circle-outline"
              style={tailwind('text-red-600')}
              size={32}
            />
          </BaseListItem>
        )}
      />
    </Container>
  );
};

export default MedicalInfo;
