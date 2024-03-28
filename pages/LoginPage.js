import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function LoginPage() {

    const navigation = useNavigation();

    const navigateToSignup = () => {
        navigation.navigate('Signup'); //navigate to sign-up page 
      };

      const navigateToSkipLoginInterestPage = () => {
        navigation.navigate('SkipLoginInterestPage'); // Navigate to skip login interest page
      };



  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/bg-login.png')} style={styles.backgroundImage}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#a9a9a9"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#a9a9a9"
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot Password</Text>
        <Text style={styles.connectWith}>Or Connect With</Text>
        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <FontAwesome name="google" size={20} color="#DB4437" />
            <Text style={styles.socialButtonText}>Continue with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.socialButton, { borderColor: 'black', marginTop: 10 }]}>
            <FontAwesome5 name="facebook" size={20} color="#1877F2" />
            <Text style={styles.socialButtonText}>Continue with Facebook</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.signUpText}>Don't Have An Account? <Text style={styles.signUpLink}  onPress={navigateToSignup}>Sign up</Text></Text>
        <TouchableOpacity style={styles.skipButton} onPress={navigateToSkipLoginInterestPage}>
          <Text style={styles.skipButtonText}>Skip this step</Text>
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
    justifyContent: 'center',
    resizeMode: 'cover',
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
  forgotPassword: {
    color: '#fff',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
  connectWith: {
    color: 'black',
    marginTop: 100,
    fontSize: 14,
    marginBottom:10,
  },
  socialButtonsContainer: {
    marginTop: 10,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 30,
    padding: 10,
    width: 250,
    alignSelf: 'center',
    
  },
  socialButtonText: {
    marginLeft: 10,
    fontSize:16,
    fontWeight:'bold',
    color: 'black',
  },
  signUpText: {
    color: 'black',
    marginTop: 20,
  },
  signUpLink: {
    color: '#305FD9',
    textDecorationLine: 'underline',
  },
  skipButton: {
    backgroundColor: '#eff5ff',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  skipButtonText: {
    color: '#215dd9',
  },
});
