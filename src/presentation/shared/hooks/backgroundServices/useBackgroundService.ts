import * as BackgroundFetch from 'expo-background-fetch';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { reloadAsync } from 'expo-updates';
import * as geolib from 'geolib';
import { AsyncStorage } from 'react-native';

import Notification from './useNotification';

const TASK_NAME = 'lifeccon-service-background';

(async () => {
  const activeAccelerometer = await AsyncStorage.getItem(
    '@activeAccelerometer'
  );
  if (activeAccelerometer === 'true') {
    const LIMIT_SPEED = 0;

    TaskManager.defineTask(TASK_NAME, async () => {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced
      });

      const didCoords = await AsyncStorage.getItem('@accelerometerDidCoords');
      const didTimer = await AsyncStorage.getItem('@accelerometerDidTimer');

      if (didCoords) {
        const meter = geolib.getDistance(
          {
            latitude: JSON.parse(didCoords).latitude,
            longitude: JSON.parse(didCoords).longitude
          },
          {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          }
        );

        if (didTimer) {
          const intervalTimer =
            new Date(Number(JSON.parse(didTimer).timestamp)).getMinutes() -
            new Date(location.timestamp).getMinutes();

          if ((meter / intervalTimer / 1000) * 60 >= LIMIT_SPEED) {
            Notification.NotificationSpeedLimit();
            Notification.NotificationUserData();
          }
        }
      }

      await AsyncStorage.setItem(
        '@accelerometerDidCoords',
        `{"latitude":"${location.coords.latitude}","longitude":"${location.coords.longitude}"}`
      );
      await AsyncStorage.setItem(
        '@accelerometerDidTimer',
        `{"timestamp":${location.timestamp}}`
      );

      return BackgroundFetch.BackgroundFetchResult.NewData;
    });
  }
})();

const runService = async () => {
  const activeAccelerometer = await AsyncStorage.getItem(
    '@activeAccelerometer'
  );
  if (activeAccelerometer === 'true') {
    BackgroundFetch.registerTaskAsync(TASK_NAME, {
      minimumInterval: 2,
      startOnBoot: false,
      stopOnTerminate: false
    });
  } else if (activeAccelerometer === null) {
    await AsyncStorage.setItem('@activeAccelerometer', 'true');
  }
};

const register = async () => {
  await AsyncStorage.setItem('@activeAccelerometer', 'true');
  reloadAsync();
};

const unRegister = async () => {
  await AsyncStorage.setItem('@activeAccelerometer', 'false');
  TaskManager.unregisterTaskAsync(TASK_NAME);
  BackgroundFetch.unregisterTaskAsync(TASK_NAME);
  reloadAsync();
};

export default { register, unRegister, runService };
