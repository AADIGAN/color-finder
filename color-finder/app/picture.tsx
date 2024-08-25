import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function Picture() {
  const { photoUri } = useLocalSearchParams();

  // Ensure photoUri is a string
  const uri = Array.isArray(photoUri) ? photoUri[0] : photoUri;

  return (
    <View style={styles.container}>
      {uri ? (
        <Image source={{ uri }} style={styles.image} />
      ) : (
        <Text>No photo available</Text>
      )}
      <Stack.Screen options={{headerShown: false}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});