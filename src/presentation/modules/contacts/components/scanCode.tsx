import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';

const ScanCode: React.FC = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }: any) => {
    setScanned(true);
    alert(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }

  return (
    <BarCodeScanner
      onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      style={{ height: '75%', marginTop: 5, marginBottom: 15 }}
    />
  );
};

export default ScanCode;
