import { Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { Text, View, TextInput, Button, ActivityIndicator, StyleSheet } from "react-native";
import { useCameraPermission, useCameraDevice, Camera } from 'react-native-vision-camera';


export default function Index() {
  const { hasPermission, requestPermission } = useCameraPermission();
 //console.log(hasPermission);

  const device = useCameraDevice('back');



  useEffect(() => { //this is asking for permission to use the camera
    if(!hasPermission){ //if it didn't ask for permission before then ask for permission
      requestPermission();
    }
  }, [hasPermission]);
  
  if(!hasPermission){ //if doesnt have permission have loading screen
    return <ActivityIndicator/>;
  }

  if(!device){
    return <Text>Camera device not found</Text>
  }

  return (
    <View>
         <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
        />
        <Stack.Screen options={{headerShown: false}}/>
    </View>
  );
}

