import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import { Accelerometer } from 'expo-sensors';

interface Props {
  x: number;
  y: number;
  z: number;
}

const calculateImpact = async ({ x, y, z }: Props) => {
  const maxSpeed = await AsyncStorage.getItem('@speedAccelerometer');
  const E =
    (75 * (((maxSpeed ? Number(maxSpeed) : 50) * 1000) / 60 / 60) * 2) / 2;
  const F = E * 2.187;
  const A = F / 75;
  const G = A / 9.81;

  await AsyncStorage.setItem(
    '@logAccelerometer',
    `Em execução: 
    {
      x=${x},
      y=${y},
      z=${z} 
    }
    Força G de detecção: ${G} g 
    - ${format(new Date(), 'dd/MM/yyyy HH:mm:ss')}`
  );

  return Math.abs(x) >= G || Math.abs(y) >= G || Math.abs(z) >= G;
};

const register = async (setStatusAccelerometer: Function) => {
  await AsyncStorage.setItem('@logAccelerometer', 'Nenhum');
  Accelerometer.addListener(async (accelerometerData) => {
    const validation = await calculateImpact(accelerometerData);
    if (validation) {
      setStatusAccelerometer(true);
      Accelerometer.removeAllListeners();
    }
  });
  Accelerometer.setUpdateInterval(500);
};

export default { register };
