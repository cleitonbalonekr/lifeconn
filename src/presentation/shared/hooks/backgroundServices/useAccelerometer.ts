import { Accelerometer } from 'expo-sensors';

const MAX_MS = 2;

const register = async (setStatusAccelerometer: Function) => {
  Accelerometer.addListener((accelerometerData) => {
    if (
      accelerometerData.x >= MAX_MS ||
      accelerometerData.y >= MAX_MS ||
      accelerometerData.z >= MAX_MS
    ) {
      setStatusAccelerometer(true);
    }
  });
  Accelerometer.setUpdateInterval(500);
};

export default register;
