import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import * as BackgroundFetch from 'expo-background-fetch';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import * as geolib from 'geolib';
import { useCallback, useEffect } from 'react';

import { useAuth } from '../../context/auth';
import Notification from '../localNotifications';
import { TASK_NAME } from './resources';

const SubscribeToBackgroundServices: React.FC = () => {
  const { authUser } = useAuth();
  const runService = useCallback(async () => {
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
      await AsyncStorage.setItem('@activeAccelerometer', 'false');
    }
  }, []);
  const subscribeToBackgroundService = useCallback(async () => {
    const activeAccelerometer = await AsyncStorage.getItem(
      '@activeAccelerometer'
    );
    if (activeAccelerometer === 'true') {
      const LIMIT_SPEED = await AsyncStorage.getItem('@speedAccelerometer');

      await AsyncStorage.setItem('@logBackgroundRun', 'Em execução');

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

            await AsyncStorage.setItem(
              '@logBackgroundTask',
              `Em execução - ${format(new Date(), 'dd/MM/yyyy HH:mm:ss')}`
            );

            await AsyncStorage.setItem(
              '@logBackgroundSpeed',
              `Em execução:
              ${(meter / intervalTimer / 1000) * 60} Km/h - ${format(
                new Date(),
                'dd/MM/yyyy HH:mm:ss'
              )}`
            );

            if (
              (meter / intervalTimer / 1000) * 60 >=
              (LIMIT_SPEED ? Number(LIMIT_SPEED) : 50)
            ) {
              Notification.NotificationSpeedLimit();
              Notification.NotificationUserData(
                authUser?.fullName || authUser?.email,
                authUser?.phoneNumber
              );
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
  }, []);

  const runBackgroundService = useCallback(async () => {
    await AsyncStorage.setItem('@logBackgroundRun', 'Parado');
    await AsyncStorage.setItem('@logBackgroundTask', 'Nenhuma');
    await AsyncStorage.setItem('@logBackgroundSpeed', 'Nenhuma');
    await subscribeToBackgroundService();
    await runService();
  }, [subscribeToBackgroundService, runService]);

  useEffect(() => {
    runBackgroundService();
  }, [runBackgroundService]);
  return null;
};

export default SubscribeToBackgroundServices;
