import AsyncStorage from '@react-native-async-storage/async-storage';
import * as BackgroundFetch from 'expo-background-fetch';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { reloadAsync } from 'expo-updates';

import { TASK_NAME } from './resources';

const toggleRegister = async (unRegister: Boolean) => {
  if (unRegister) {
    await AsyncStorage.setItem('@activeAccelerometer', 'false');
    TaskManager.unregisterTaskAsync(TASK_NAME);
    BackgroundFetch.unregisterTaskAsync(TASK_NAME);
  } else {
    await Location.requestBackgroundPermissionsAsync();
    await Location.requestForegroundPermissionsAsync();
    await AsyncStorage.setItem('@activeAccelerometer', 'true');
  }
  await reloadAsync();
};

export default toggleRegister;
