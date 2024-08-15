import React, { useEffect } from 'react';
import { View, Text, Button, PermissionsAndroid, Alert } from 'react-native';
// @ts-ignore
import { launchCamera } from 'react-native-image-picker';
// @ts-ignore
import { CvCamera, CvInvoke, CvScalar } from 'react-native-opencv3';

export default function Index() {

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Camera Permission",
          message: "Color Finder needs access to your camera to pick colors from images.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera permission granted");
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const openCamera = () => {
    launchCamera({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      } else {
        console.log('Image URI: ', response.assets[0].uri);
        // Here you can process the image with OpenCV
      }
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Button title="Open Camera" onPress={openCamera} />
      {/* Here you could also add a CvCamera component for live processing */}
      {/* <CvCamera style={{width: 300, height: 400}} /> */}
    </View>
  );
}
