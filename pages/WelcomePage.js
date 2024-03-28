import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Import AntDesign icon library
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function WelcomePage() {
  const navigation = useNavigation();

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Internspot</Text>
      <View style={styles.content}>
        <Image
          source={require('../assets/welcomepic.png')}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.bigText}>
            <Text style={styles.blackText}>Find Your{"\n"}</Text>
            <Text style={styles.blueText}>Dream Internship{"\n"}</Text>
            <Text style={styles.blackText}>Here!</Text>
          </Text>
          <Text style={styles.smallText}>
            Explore all the most exciting internships based on your interest and study major.
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
        <AntDesign name="arrowright" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
    position: 'relative', // Added to establish positioning context
  },
  title: {
    position: 'absolute',
    top: 30,
    right: 20,
    color: '#0047D2',
    fontSize: 21,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: width * 0.8,
    height: height * 0.4,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  bigText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  blackText: {
    color: 'black',
  },
  blueText: {
    color: '#0047d2',
    fontWeight: 'bold',
  },
  smallText: {
    color: '#524B6B',
    textAlign: 'center',
    fontSize: 12,
  },
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#0047d2',
    borderRadius: 50,
    padding: 15,
  },
});
