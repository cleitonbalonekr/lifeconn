import { Accelerometer } from 'expo-sensors';

const MAX_MS = 1.5;

const register = async (setStatusAccelerometer: Function) => {
  Accelerometer.addListener((accelerometerData) => {
    console.log(accelerometerData);
    if (
      Math.abs(accelerometerData.x) >= MAX_MS ||
      Math.abs(accelerometerData.y) >= MAX_MS ||
      Math.abs(accelerometerData.z) >= MAX_MS
    ) {
      setStatusAccelerometer(true);
      Accelerometer.removeAllListeners();
    }
  });
  Accelerometer.setUpdateInterval(500);
};

export default { register };
