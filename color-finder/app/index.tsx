import { router, Stack, Link } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Text, View, Button, ActivityIndicator, StyleSheet, Image, Platform } from "react-native";
// Import necessary hooks and components from react-native-vision-camera library
import { useCameraPermission, useCameraDevice, Camera } from 'react-native-vision-camera';


export default function Index() {
  // useCameraPermission: Hook to handle camera permission
  // useCameraDevice: Hook to get information about the camera device
  const [frontOrBack, setFrontOrBack] = useState<'front' | 'back'>('back'); //there is two name within the bracket [frontOrBack, setFrontOrBack] frontOrBack is the state variable where it holds the current value of the state. setFrontOrBack is the state updater function where it allows you to update the value of frontOrback
  //"useState<>"
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
    if (!cameraRef.current || isCapturing) return;
  
    setIsCapturing(true);
  
    try {
      const photo = await cameraRef.current.takePhoto();
  
      const uri = Platform.OS === 'android' ? `file://${photo.path}` : photo.path;
      setPhotoUri(uri);
  
      console.log('Photo URI:', uri);
  
      // Use router.push with correct parameters
      router.push({
        pathname: '/picture',
        params: { photoUri: uri }, // Ensure photoUri is a string
      });
    } catch (error) {
      console.error("Error taking photo:", error);
    } finally {
      setIsCapturing(false);
    }
  };

  const toggleCamera = () => {
    setFrontOrBack(prev => (prev === 'back' ? 'front' : 'back'));
  };   //prev => () this is a arrow function that takes the previous state value ('prev') as its arguemnt. its a call back function that setFrontOrBack will call with the current value of frontOrBack 
    //prev === 'back' ? 'front' : 'back'. it checks the current value of preve (which is the previous state). 
    
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
        <Button title = "" onPress={toggleCamera}></Button>

      </View>
      

      <View style={styles.controls}>
        {/* Button to trigger photo capture */}
        <Button title="Take photo" onPress={takePhoto} disabled={isCapturing} />
        

        
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
