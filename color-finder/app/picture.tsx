import { Link, router, Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';

export default function Picture() {
  const { photoUri } = useLocalSearchParams();

  // Ensure photoUri is a string
  const uri = Array.isArray(photoUri) ? photoUri[0] : photoUri;

  console.log('Received photoUri:', uri);

  return (
    <View style={styles.container}>
      <View style={styles.back}>
        <Button
          title="X"
          onPress={() => router.back()}
          color="#007BFF"
        />
      </View>

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
    // alignItems: 'center',
    // justifyContent: 'center',
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
  image: {
    width: '100%',
    height: '100%',
  },
});
