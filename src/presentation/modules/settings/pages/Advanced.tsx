import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';

import { CALL_NUMBER_EMERGENCY } from '@/configs/index';
import Container from '@/presentation/shared/components/Container';
import Range from '@/presentation/shared/components/form/range';

const Advanced: React.FC = () => {
  const tailwind = useTailwind();
  const [speed, setSpeed] = useState(50);
  const [logBackground, setlogBackground] = useState('Parado');
  const [logTask, setlogTask] = useState('Nenhuma');
  const [logSpeed, setlogSpeed] = useState('Nenhuma');
  const [logAccelerometer, setlogAccelerometer] = useState('Nenhum');

  async function loadLogs() {
    const newSpeed = await AsyncStorage.getItem('@speedAccelerometer');
    if (newSpeed) setSpeed(Number(newSpeed));
    const logsB = await AsyncStorage.getItem('@logBackgroundRun');
    if (logsB) setlogBackground(logsB);
    const logsT = await AsyncStorage.getItem('@logBackgroundTask');
    if (logsT) setlogTask(logsT);
    const logsS = await AsyncStorage.getItem('@logBackgroundSpeed');
    if (logsS) setlogSpeed(logsS);
    const logsA = await AsyncStorage.getItem('@logAccelerometer');
    if (logsA) setlogAccelerometer(logsA);
  }

  async function handleSpeedAccelerometer() {
    await AsyncStorage.setItem('@speedAccelerometer', `${speed}`);
  }

  useEffect(() => {
    loadLogs();
  }, []);

  useEffect(() => {
    handleSpeedAccelerometer();
  }, [speed]);

  return (
    <Container scroll>
      <View style={tailwind('flex-1')}>
        <View style={tailwind('bg-slate-300 p-2 rounded-md')}>
          <Text style={tailwind('text-lg font-bold')}>
            Velocidade de monitoramento: {speed} Km/h
          </Text>
          <Range
            maximumValue={400}
            minimumValue={0}
            step={5}
            value={speed}
            onValueChange={(e) => {
              setSpeed(e);
            }}
          />
          <Text style={tailwind('text-sm text-blue-600')}>
            <Ionicons name="ios-car" size={20} />- Sugest??o de 50km/h para
            carros
          </Text>
          <Text style={tailwind('text-sm text-blue-600')}>
            <Ionicons name="ios-bicycle" size={20} />- Sugest??o de 30km/h para
            motos
          </Text>
          <Text style={tailwind('text-sm text-blue-600')}>
            <Ionicons name="ios-walk" size={20} />- Sugest??o de 10km/h para
            pedestres
          </Text>
        </View>
        <View style={tailwind('bg-slate-300 p-2 mt-2 rounded-md')}>
          <Text style={tailwind('text-lg font-bold mt-2 mb-2')}>
            Limita????es do Monitoramento
          </Text>
          <Text style={tailwind('text-lg text-black')}>
            O sistema de detec????o de colis??o s?? funciona com a aplica????o aberta.
            Dessa forma, para alerta-lo de quando deve abrir a aplica????o, defina
            um limite de velocidade. Ao atingir esse limite, voc?? ser??
            notificado para que abra a aplica????o.
          </Text>
          <Text style={tailwind('text-lg font-bold mt-2 mb-2')}>
            Funcionamento Offline
          </Text>
          <Text style={tailwind('text-lg text-black')}>
            {`* Geolocaliza????o poder?? n??o funcionar corretamente.
* Cria????o de eventos ficar?? indispon??vel.
* Notifica????o de familiares ficar?? indispon??vel.
* Chat ficar?? indispon??vel.
* Na detec????o por aceler??metro a aplica????o persistir??
at?? que consiga conex??o ou a solicita????o seja cancelada.
* Nas demais solicita????es a aplica????o ir?? encaminhar
para a comunica????o tradicional com as autoridades.`}
          </Text>
        </View>
        <View style={tailwind('bg-slate-300 p-2 mt-2 rounded-md')}>
          <Text style={tailwind('text-lg font-bold mt-2 mb-2')}>
            Telefone de emerg??ncia
          </Text>
          <Text style={tailwind('text-sm text-black')}>
            {`Telefone configurado: ${CALL_NUMBER_EMERGENCY}`}
          </Text>
        </View>
        <View style={tailwind('bg-slate-300 p-2 mt-2 rounded-md')}>
          <Text style={tailwind('text-lg font-bold mt-2 mb-2')}>
            Log de execu????o - background
          </Text>
          <Text style={tailwind('text-sm text-black')}>
            {`Execu????o - ${logBackground}`}
          </Text>
          <Text style={tailwind('text-sm text-black')}>
            {`??ltima tarefa: ${logTask}`}
          </Text>
        </View>
        <View style={tailwind('bg-slate-300 p-2 mt-2 rounded-md')}>
          <Text style={tailwind('text-lg font-bold mt-2 mb-2')}>
            Log de execu????o - velocidade
          </Text>
          <Text style={tailwind('text-sm text-black')}>
            {`??tilma execu????o - ${logSpeed}`}
          </Text>
        </View>
        <View style={tailwind('bg-slate-300 p-2 mt-2 rounded-md')}>
          <Text style={tailwind('text-lg font-bold mt-2 mb-2')}>
            Log de execu????o - aceler??metro
          </Text>
          <Text style={tailwind('text-sm text-black')}>
            {`??tilma execu????o - ${logAccelerometer}`}
          </Text>
        </View>
      </View>
    </Container>
  );
};

export default Advanced;
