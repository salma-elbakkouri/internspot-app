import React, { useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';
import Constants from 'expo-constants';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ApplyWebView = ({route}) => {
  const navigation = useNavigation();
  const { url } = route.params;
  const [cookies, setCookies] = useState('');

  const handleGoBack = () => {
    navigation.dispatch(StackActions.pop(1));
  };

  useEffect(() => {
    // Load stored cookies when component mounts
    loadCookies();
  }, []);

  const loadCookies = async () => {
    // Load cookies from AsyncStorage
    const storedCookies = await AsyncStorage.getItem('cookies');
    if (storedCookies) {
      setCookies(storedCookies);
    }
  };

  const handleNavigationStateChange = async (navState) => {
    // Check if the user has successfully logged in
    if (navState.url.includes('login_success')) {
      // Extract cookies from the navigation state
      const newCookies = navState?.headers?.['Set-Cookie'] || '';
      // Store cookies securely
      await AsyncStorage.setItem('cookies', newCookies);
      // Update the state with the new cookies
      setCookies(newCookies);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleGoBack}>
        <AntDesign name="close" size={24} color="black" />
      </TouchableOpacity>
      <WebView
        style={styles.webView}
        source={{ uri: url }}
        onNavigationStateChange={handleNavigationStateChange}
        // Set cookies as headers for subsequent requests
        setCookie={cookies}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  webView: {
    flex: 1,
  },
  button: {
    top: -12,
    left: 20,
    zIndex: 999,
  },
});

export default ApplyWebView;
