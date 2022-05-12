import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';

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
            <Ionicons name="ios-car" size={20} />- Sugestão de 50km/h para
            carros
          </Text>
          <Text style={tailwind('text-sm text-blue-600')}>
            <Ionicons name="ios-bicycle" size={20} />- Sugestão de 30km/h para
            motos
          </Text>
          <Text style={tailwind('text-sm text-blue-600')}>
            <Ionicons name="ios-walk" size={20} />- Sugestão de 10km/h para
            pedestres
          </Text>
        </View>
        <View style={tailwind('bg-slate-300 p-2 mt-2 rounded-md')}>
          <Text style={tailwind('text-lg font-bold mt-2 mb-2')}>
            Funcionamento Offline
          </Text>
          <Text style={tailwind('text-sm text-green-600')}>
            {`* Geolocalização poderá não funcionar corretamente.
* Criação de eventos ficará indisponível.
* Notificação de familiares ficará indisponível.
* Chat ficará indisponível.
* Na detecção por acelerômetro a aplicação persistirá
até que consiga conexão ou a solicitação seja cancelada.
* Nas demais solicitações a aplicação irá encaminhar
para a comunicação tradicional com as autoridades.`}
          </Text>
        </View>
        <View style={tailwind('bg-slate-300 p-2 mt-2 rounded-md')}>
          <Text style={tailwind('text-lg font-bold mt-2 mb-2')}>
            Log de execução - background
          </Text>
          <Text style={tailwind('text-sm text-green-600')}>
            {`Execução - ${logBackground}`}
          </Text>
          <Text style={tailwind('text-sm text-green-600')}>
            {`Última tarefa: ${logTask}`}
          </Text>
        </View>
        <View style={tailwind('bg-slate-300 p-2 mt-2 rounded-md')}>
          <Text style={tailwind('text-lg font-bold mt-2 mb-2')}>
            Log de execução - velocidade
          </Text>
          <Text style={tailwind('text-sm text-green-600')}>
            {`Útilma execução - ${logSpeed}`}
          </Text>
        </View>
        <View style={tailwind('bg-slate-300 p-2 mt-2 rounded-md')}>
          <Text style={tailwind('text-lg font-bold mt-2 mb-2')}>
            Log de execução - acelerômetro
          </Text>
          <Text style={tailwind('text-sm text-green-600')}>
            {`Útilma execução - ${logAccelerometer}`}
          </Text>
        </View>
      </View>
    </Container>
  );
};

export default Advanced;
