import { Link, router, Stack, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableWithoutFeedback } from 'react-native';

export default function Picture() {
  const { photoUri } = useLocalSearchParams();
  const [dot, setDot] = useState<{ x: number, y: number } | null>(null);


  // Ensure photoUri is a string
  const uri = Array.isArray(photoUri) ? photoUri[0] : photoUri;

  console.log('Received photoUri:', uri);

  const handlePress = (e: { nativeEvent: { locationX: any; locationY: any; }; }) => {
    const { locationX, locationY } = e.nativeEvent;
    console.log(`Touched at X: ${locationX}, Y: ${locationY}`);
    setDot({ x: locationX, y: locationY });
  };

  return (
    <View style={styles.container}>
      <View style={styles.back}>
        <Button
          title="X"
          onPress={() => router.back()}
          color="#007BFF"
        />
      </View>

      <View style={styles.imageContainer}>
        <TouchableWithoutFeedback onPressIn={handlePress}>
          <Image
            source={{ uri: uri }}
            style={styles.image}
          />
        </TouchableWithoutFeedback>

        {dot && (
          <View
            style={[
              styles.dot,
              { left: dot.x - 5, top: dot.y - 5 }, // Center the dot on the touch point
            ]}
          />
        )}
      </View>

      <Stack.Screen options={{headerShown: false}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  back: {
    position: 'absolute',
    zIndex: 2,
    width: '15%',
    height: '15%',
    marginTop: 25,
    marginRight: 20,
    marginBottom: 20,
    marginLeft: 10,
  },
  imageContainer: {
    flex: 1,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  dot: {
    position: 'absolute',
    width: 10,
    height: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
});
