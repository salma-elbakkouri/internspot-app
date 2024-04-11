import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { auth, createUserWithEmailAndPassword, sendEmailVerification } from '../config/firebase'; // Import sendEmailVerification

export default function SignupPage({route}) {
  const navigation = useNavigation();
  const OfferdetailPageRedirect = route.params?.OfferdetailPageRedirect;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

  const navigateBack = () => {
    navigation.goBack(); // Go back to the previous screen
  };


  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setHideConfirmPassword(!hideConfirmPassword);
  };

  const handleSubmit = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
  
    // Email validation regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }
  
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
  
    if (password.length < 6) {
      Alert.alert('Error', 'Password should be at least 6 characters long.');
      return;
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Send verification email
      await sendEmailVerification(user);
      
      if (OfferdetailPageRedirect) {
        navigation.navigate('SkipLoginInterestPage', {
          skiped: false,
          user: user,
          OfferdetailPageRedirect: true,
          offer: route.params.offer,
        });
      }else{
        navigation.navigate('SkipLoginInterestPage', {skiped: false, user: user});
      }
    } catch (error) {
      console.error('Error signing up:', error.message);
      Alert.alert('Error', 'Failed to sign up. Please try again.');
    }
  };
  



  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/bg-signup.png')} style={styles.backgroundImage}>
        <TouchableOpacity style={styles.backButton} onPress={navigateBack}>
          <FontAwesome name="arrow-left" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#a9a9a9"
          onChangeText={setName}
          value={name}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#a9a9a9"
          onChangeText={setEmail}
          value={email}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="#a9a9a9"
            secureTextEntry={hidePassword}
            onChangeText={setPassword}
            value={password}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
            <FontAwesome name={hidePassword ? 'eye' : 'eye-slash'} size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Confirm Password"
            placeholderTextColor="#a9a9a9"
            secureTextEntry={hideConfirmPassword}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
          />
          <TouchableOpacity onPress={toggleConfirmPasswordVisibility} style={styles.eyeIcon}>
            <FontAwesome name={hideConfirmPassword ? 'eye' : 'eye-slash'} size={20} color="black" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>OR</Text>
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
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginTop: 130,
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
  orText: {
    color: 'black',
    marginTop: 100,
    fontSize: 14,
    fontWeight: 'bold',
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
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  passwordInput: {
    paddingLeft: 15,
    width: 250,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 30,
    paddingHorizontal: 10,
    color: 'black',
  },
  eyeIcon: {
    position:'absolute',
    right: 15
  },
}); 