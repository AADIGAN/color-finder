import { Link, router, Stack, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Button, PanResponder } from 'react-native';

export default function Picture() {
  const { photoUri } = useLocalSearchParams();
  const [dot, setDot] = useState<{ x: number, y: number } | null>(null);

  // Ensure photoUri is a string
  const uri = Array.isArray(photoUri) ? photoUri[0] : photoUri;

  console.log('Received photoUri:', uri);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      const { moveX, moveY } = gestureState;
      console.log(`Moved to X: ${moveX}, Y: ${moveY}`);
      setDot({ x: moveX, y: moveY });
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.back}>
        <Button
          title="X"
          onPress={() => router.back()}
          color="#007BFF"
        />
      </View>

      <View style={styles.imageContainer} {...panResponder.panHandlers}>
        <Image
          source={{ uri: uri }}
          style={styles.image}
        />

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
