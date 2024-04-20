import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../config/firebase';

export default function ForgotPasswordPage() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');

  const handleReset = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email.');
      return;
    }
  
    // code to send reset password
    
  };
  

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/bg-signup.png')} style={styles.backgroundImage}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <FontAwesome name="chevron-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Reset Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#a9a9a9"
          onChangeText={setEmail}
          value={email}
        />
        <TouchableOpacity style={styles.button} onPress={handleReset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginTop: 100,
  },
  input: {
    paddingLeft: 15,
    width: 250,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 30,
    marginTop: 20,
    paddingHorizontal: 10,
    color: 'black',
  },
  button: {
    width: 250,
    height: 40,
    backgroundColor: '#5ca3e3',
    borderRadius: 30,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    color:'white',
  },
});
