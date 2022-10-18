import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { Switch, Text, View, FlatList } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';

import { MedicalData } from '@/domain/models';
import {
  AddMedicalData,
  UpdateMedicalData,
  DeleteMedicalData
} from '@/domain/usecases';
import { Validation } from '@/presentation/protocols';
import BaseListItem from '@/presentation/shared/components/BaseListItem';
import Container from '@/presentation/shared/components/Container';
import Button from '@/presentation/shared/components/form/button';
import Input from '@/presentation/shared/components/form/input';
import LoadingOverlay, {
  LoadingOverlayRefProps
} from '@/presentation/shared/components/LoadingOverlay';
import { useAuth } from '@/presentation/shared/context/auth';
import useFeedbackMessage from '@/presentation/shared/hooks/useFeedbackMessage';
import useInputState from '@/presentation/shared/hooks/useInputState';

import MedicalEmpty from '../components/MedicalEmpty';

interface Props {
  validation: Validation;
  addMedicalData: AddMedicalData;
  updateMedicalData: UpdateMedicalData;
  deleteMedicalData: DeleteMedicalData;
}

const MedicalInfo: React.FC<Props> = ({
  validation,
  addMedicalData,
  updateMedicalData,
  deleteMedicalData
}) => {
  const { authUser, saveUserSate } = useAuth();
  const loadingOverlayRef = useRef<LoadingOverlayRefProps>(null);
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useFeedbackMessage();
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
  const allowContacts = useInputState({
    name: 'allowContacts',
    initialValue: false
  });

  const tailwind = useTailwind();

  async function handleCreateMedicalInfo() {
    try {
      setLoading(true);
      const payload = {
        title: title.value,
        description: description.value,
        onlyOrganization: !allowContacts.value
      };
      const validate = await validation.validateForm(payload);
      const { valid, errors } = validate;
      if (!valid && errors) {
        title.setError(errors);
        description.setError(errors);
      } else {
        const newUserInfo = await addMedicalData.add(payload, authUser.id);
        saveUserSate(newUserInfo);
        showSuccess({
          description: 'Dado médico salvo com sucesso!'
        });
      }
    } catch (error: any) {
      showError(error);
    } finally {
      setLoading(false);
    }
  }
  async function handleUpdateMedicalInfo() {
    try {
      setLoading(true);
      const payload = {
        id: medicalDataId.value,
        title: title.value,
        description: description.value,
        onlyOrganization: !allowContacts.value
      };

      const validate = await validation.validateForm(payload);
      const { valid, errors } = validate;
      if (!valid && errors) {
        title.setError(errors);
        description.setError(errors);
      } else {
        const newUserInfo = await updateMedicalData.update(
          payload,
          authUser.id
        );
        saveUserSate(newUserInfo);
        showSuccess({
          description: 'Dado médico atualizado com sucesso!'
        });
        handleExitEditMode();
      }
    } catch (error: any) {
      showError(error);
    } finally {
      setLoading(false);
    }
  }
  async function handleDeleteMedicalInfo() {
    try {
      loadingOverlayRef.current?.showLoading();
      if (loading) return;
      const newUserInfo = await deleteMedicalData.remove(
        medicalDataId.value,
        authUser.id
      );
      saveUserSate(newUserInfo);
      showSuccess({
        description: 'Dado médico removido com sucesso!'
      });

      handleExitEditMode();
    } catch (error: any) {
      showError(error);
    } finally {
      loadingOverlayRef.current?.hideLoading();
    }
  }
  function handleChooseItem(item: MedicalData) {
    setIsOnEditMode(true);
    title.set(item.title);
    description.set(item.description);
    medicalDataId.set(item.id);
    allowContacts.set(!item.onlyOrganization);
  }
  function handleExitEditMode() {
    if (loading) return;
    setIsOnEditMode(false);
    title.set('');
    description.set('');
    medicalDataId.set('');
    allowContacts.set(false);
  }

  return (
    <Container>
      <LoadingOverlay ref={loadingOverlayRef} />
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
      <View style={tailwind('flex-row justify-start items-center mt-3 ')}>
        <Switch
          value={allowContacts.value}
          onValueChange={allowContacts.set}
          style={tailwind(' mr-2')}
        />
        <Text style={tailwind('text-sm font-ubuntu')}>
          Visíveis para pessoas próximas
        </Text>
      </View>
      <Text
        style={tailwind('text-sm font-ubuntu text-yellow-700 text-justify')}
      >
        * Permiti que as pessoas que cadastrei vejam esses dados em uma situação
        de socorro.
      </Text>
      <View style={tailwind('my-3')}>
        {isOnEditMode ? (
          <View style={tailwind('flex-row justify-between')}>
            <View style={tailwind('flex-1 mr-2')}>
              <Button
                label="Salvar"
                onPress={handleUpdateMedicalInfo}
                loading={loading}
              >
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
          <Button
            label="Cadastrar"
            onPress={handleCreateMedicalInfo}
            loading={loading}
          >
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
        data={authUser.medicalData}
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
