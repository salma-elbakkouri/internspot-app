import React , {useState} from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity , Alert } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { auth, signInWithEmailAndPassword } from '../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function LoginPage({route}) {
  const navigation = useNavigation();
  const OfferdetailPageRedirect = route.params?.OfferdetailPageRedirect;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  const navigateToSignup = () => {
    if (OfferdetailPageRedirect) {
      navigation.navigate('Signup', {
        OfferdetailPageRedirect: true,
        offer: route.params.offer,
      }); //navigate to sign-up page 
    }else {
      navigation.navigate('Signup'); //navigate to sign-up page
    }
  };

  const navigateToSkipLoginInterestPage = () => {
    navigation.navigate('SkipLoginInterestPage', {skiped: true}); // navigate to skip login interest page
  };

  const navigateToHomePage = () => {
    navigation.navigate('Home', {skiped: true}); // navigate to home page
  }

  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  const navigateToOfferPage = () => {
    navigation.navigate('OfferdetailPage', { 
      offer: route.params.offer,
      comeFromLoginPage: true,
     });
  }

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userData = userCredential.user;

      // if (!userData.emailVerified) {
      //   Alert.alert(
      //     'Email Verification Required',
      //     'Please verify your email before logging in. Check your inbox for verification instructions.'
      //   );
      //   // You may choose to send a verification email again here if needed
      //   return;
      // }


      setEmail('');
      setPassword('');
      setHidePassword(true);
      if (OfferdetailPageRedirect) {
        navigateToOfferPage();
        return;
      }
      navigation.navigate('Home', { user: userData, skiped: false });
    } catch (error) {
      console.error('Error signing in:', error.message);
      Alert.alert('Error', 'Failed to sign in. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/bg-login.png')} style={styles.backgroundImage}>
        <Text style={styles.title}>Login</Text>
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
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
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
        <Text style={styles.signUpText}>Don't Have An Account? <Text style={styles.signUpLink} onPress={navigateToSignup}>Sign up</Text></Text>
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
    marginBottom: 10,
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