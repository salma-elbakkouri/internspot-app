import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Import AntDesign icon library
import { useNavigation } from '@react-navigation/native';

export default function WelcomePage() {
  const navigation = useNavigation();

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Internspot</Text>
      <Image
        source={require('./assets/welcomepic.png')}
        style={styles.image}
      />
      <Text style={styles.bigText}>
        <Text style={styles.blackText}>Find Your{"\n"}</Text>
        <Text style={styles.blueText}>Dream Internship{"\n"}</Text>
        <Text style={styles.blackText}>Here!</Text>
      </Text>
      <Text style={styles.smallText}>
        Explore all the most exciting internships based on your interest and study major.
      </Text>
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
  },
  title: {
    position: 'absolute',
    top: 50,
    right: 10,
    color: '#0047D2',
    fontSize: 21,
    fontWeight: 'bold',
  },
  image: {
    marginTop: 100,
    width:  320,
    height: 320,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  bigText: {
    fontSize: 30,
    fontWeight:'bold',
    textAlign:'left',
    marginRight:60,
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
    marginTop: 20,
    fontSize:12,
  },
  button: {
    backgroundColor: '#0047d2',
    borderRadius: 50,
    padding: 15,
    marginTop: 100,
    marginLeft:'auto',
  },
});
