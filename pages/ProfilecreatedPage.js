import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function ProfilecreatedPage({ navigation }) {
   const navigateToHomePage = () => {
    navigation.navigate('Home', {skiped: false}); //navigate to education page 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.successText}>Your Profile created successfully!</Text>
      <Image
        source={require('../assets/profilecreated.png')} // Make sure to provide correct path to your image
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.message}>Let’s explore the offers that interest you</Text>
      <TouchableOpacity style={styles.button} onPress={navigateToHomePage}>
        <AntDesign name="arrowright" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    paddingLeft: 25,
    paddingRight: 25,
  },
  successText: {
    marginTop: 90,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0047D2',
    textAlign: 'center',
    marginBottom: 20,
  },
  image: {
    marginTop: 50,
    width: '100%',
    height: 300, // Adjust height as needed
  },
  message: {
    marginTop:20,
    fontSize: 18,
    color: '#524B6B',
    textAlign: 'center',
  },
  button: {
    marginLeft:'auto',
    marginRight:10,
    marginBottom:10,
    marginTop:'auto',
    backgroundColor: '#0047d2',
    borderRadius: 50,
    padding: 15,
  },
});
