import { Stack } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Text, View, Button, ActivityIndicator, StyleSheet, Image, Platform } from "react-native";
// Import necessary hooks and components from react-native-vision-camera library
import { useCameraPermission, useCameraDevice, Camera } from 'react-native-vision-camera';

export default function Index() {
  // useCameraPermission: Hook to handle camera permission
  // useCameraDevice: Hook to get information about the camera device
  const [frontOrBack, setFrontOrBack] = useState<'front' | 'back'>('back');
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice(frontOrBack); //initialize to the back camera first  
  const cameraRef = useRef<Camera>(null); // Ref to access the Camera component methods
  const [photoUri, setPhotoUri] = useState<string | null>(null); // State to store the photo URI
  const [isCapturing, setIsCapturing] = useState(false); // State to track if a photo is being captured

  useEffect(() => {
    // Request camera permission if not already granted
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);

  // If the app doesn't have camera permission, show a loading indicator
  if (!hasPermission) {
    return <ActivityIndicator />;
  }

  // If the camera device is not found, display a message
  if (!device) {
    return <Text>Camera device not found</Text>;
  }

  // Function to take a photo
  const takePhoto = async () => {
    // Prevent taking multiple photos at the same time
    if (!cameraRef.current || isCapturing) return;

    setIsCapturing(true); // Indicate that photo capturing is in progress

    try {
      const photo = await cameraRef.current.takePhoto({
        qualityPrioritization: 'quality', // Prioritize quality over speed
      });

      // Construct the URI for displaying the photo
      const uri = Platform.OS === 'android' ? `file://${photo.path}` : photo.path;
      setPhotoUri(uri); // Store the photo URI in the state
    } catch (error) {
      console.error("Error taking photo:", error); // Log any errors that occur during photo capture
    } finally {
      setIsCapturing(false); // Reset capturing state after the photo is taken
    }
  };

  const toggleCamera = () => {
    setFrontOrBack(prev => (prev === 'back' ? 'front' : 'back'));
  };  

  return (
    <View style={{ flex: 1 }}>
      {/* Camera component to display the camera preview */}
      <Camera
        style={StyleSheet.absoluteFill} // Fill the entire screen
        device={device} // Use the selected camera device
        isActive={true} // Make the camera active
        ref={cameraRef} // Attach the ref to access Camera methods
        photo={true} // Enable photo capturing
      />

      <View style ={styles.flipCamera}> 
        <Button title = "flip camera" onPress={toggleCamera}></Button>

      </View>
      

      <View style={styles.controls}>
        {/* Button to trigger photo capture */}
        <Button title="Take photo" onPress={takePhoto} disabled={isCapturing} />
        {photoUri && (
          // Display the captured photo if it exists
          <Image source={{ uri: photoUri }} style={styles.photo} />
        )}
      </View>
      
      
       {/* Hide the header for this screen */}
      <Stack.Screen options={{headerShown: false}}/>
    </View>
  );
}

// Styles for the controls and photo preview
const styles = StyleSheet.create({
  controls: {
    position: 'absolute', // Position at the bottom of the screen
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  photo: {
    marginTop: 20,
    width: 200,
    height: 200,
    resizeMode: 'contain', // Maintain aspect ratio
  },
  flipCamera: {
    position: 'absolute', // Position at the bottom of the screen
    bottom: 20,
    width: '30%',
  }
});
