import React from 'react';
import { Text, View, TextInput, Button } from "react-native";


export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Text>Shake your phone to open the developer menu.</Text>
      <Text>Ivona sucks</Text>
      <Text>hellor</Text>
      <TextInput
      placeholder="useless placeholder"
      />

      <Button
        onPress={() => {
          alert("you are kinda weird bro");
        }}
        title="press me"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      
    

    </View>
  );
}
