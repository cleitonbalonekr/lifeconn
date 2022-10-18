import 'dotenv/config';

export default {
  expo: {
    name: 'Lifeconn',
    slug: 'lifeconn',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff'
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      userInterfaceStyle: 'dark'
    },
    android: {
      package: 'com.lifeconn.app',
      versionCode: 1,
      googleServicesFile: './google-services.json',
      userInterfaceStyle: 'light',
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#FFFFFF'
      },
      permissions: [
        'ACCESS_FINE_LOCATION',
        'ACCESS_BACKGROUND_LOCATION',
        'VIBRATE',
        'CAMERA'
      ]
    },
    web: {
      favicon: './assets/favicon.png'
    },
    extra: {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
      firebaseMeasureId: process.env.FIREBASE_MEASUREMENT_ID,
      zenviaToken: process.env.ZENVIA_TOKEN,
      callNumberEmergency: process.env.CALL_NUMBER_EMERGENCY
    },
    plugins: [
      [
        'expo-image-picker',
        {
          photosPermission:
            'O aplicativo acessa suas fotos para poder compartilha-las com os bombeiros.'
        }
      ]
    ]
  }
};
