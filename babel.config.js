module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],

    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          extensions: ['.ts', '.tsx', '.jsx', '.js', '.json'],
          alias: {
            '@': './src',
            '@main': './src/main',
            '@/tests/': './tests'
          }
        }
      ],
      'react-native-reanimated/plugin'
    ]
  };
};
