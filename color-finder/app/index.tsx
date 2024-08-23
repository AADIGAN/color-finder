import React, { useEffect, useRef, useState } from 'react';
import { Text, View, Button, ActivityIndicator, StyleSheet, Image, Platform } from "react-native";
import { useCameraPermission, useCameraDevice, Camera } from 'react-native-vision-camera';

export default function Index() {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');
  const cameraRef = useRef<Camera>(null);
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
      const photo = await cameraRef.current.takePhoto({
        qualityPrioritization: 'quality',
      });

      // Directly use the path for displaying without moving it
      const uri = Platform.OS === 'android' ? `file://${photo.path}` : photo.path;
      setPhotoUri(uri);
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
        photo={true}
      />

      <View style={styles.controls}>
        <Button title="Take Photo" onPress={takePhoto} disabled={isCapturing} />
        {photoUri && (
          <Image source={{ uri: photoUri }} style={styles.photo} />
        )}
      </View>
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