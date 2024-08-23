import { Stack } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Text, View, Button, ActivityIndicator, StyleSheet, Image } from "react-native";
import { useCameraPermission, useCameraDevice, Camera, takeSnapshot } from 'react-native-vision-camera';
import * as FileSystem from 'expo-file-system';

export default function Index() {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');
  const cameraRef = useRef(null);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);

  if (!hasPermission) {
    return <ActivityIndicator />;
  }

  if (!device) {
    return <Text>Camera device not found</Text>;
  }

  const takePhoto = async () => {
    if (!cameraRef.current || isCapturing) return;

    setIsCapturing(true);

    try {
      const photo = await takeSnapshot(cameraRef.current, {
        quality: 85,
        skipMetadata: true,
      });

      const fileUri = `${FileSystem.cacheDirectory}photo.jpg`;
      await FileSystem.writeAsStringAsync(fileUri, photo.base64, { encoding: FileSystem.EncodingType.Base64 });

      setPhotoUri(fileUri);
    } catch (error) {
      console.error("Error taking photo:", error);
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        ref={cameraRef}
      />

      <View style={styles.controls}>
        <Button title="Take Photo" onPress={takePhoto} disabled={isCapturing} />
        {photoUri && (
          <Image source={{ uri: photoUri }} style={styles.photo} />
        )}
      </View>

      <Stack.Screen options={{ headerShown: false }} />
    </View>
  );
}

const styles = StyleSheet.create({
  controls: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  photo: {
    marginTop: 20,
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});
