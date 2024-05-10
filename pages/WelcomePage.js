import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function WelcomePage() {
  const navigation = useNavigation();

  const { width } = Dimensions.get('window');
  const isWeb = Platform.OS === 'web';  // Check if the platform is web

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  // Define styles inside the component to use the isWeb flag and responsive layout
  const styles = getStyles(width, isWeb);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Internspot</Text>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.bigText}>
            Find Your <Text style={styles.blueText}>Dream Internship</Text> Here!
          </Text>
          <Text style={styles.smallText}>
          Discover an array of thrilling internship opportunities tailored to your passions and academic focus. Whether you're intrigued by technology, fascinated by finance, or passionate about public service, our platform offers a diverse selection of internships aligned with your interests and study major.
          </Text>
        </View>
        <Image
          source={require('../assets/welcomepic.png')}
          style={styles.image}
          onError={(e) => console.error("Failed to load image:", e.nativeEvent.error)} // Log error
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
        <Text style={styles.button_text}>Next</Text>
        <AntDesign name="arrowright" size={15} color="white" />
      </TouchableOpacity>
    </View>
  );
}

// Function to dynamically generate responsive styles
function getStyles(width, isWeb) {
  const scale = width < 768 ? (width < 360 ? 1.2 : 1) : 0.8; // Adjust scale based on width thresholds
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: '5%',
      paddingTop: '5%',
      paddingBottom: '5%',
      position: 'relative',
    },
    title: {
      position: 'absolute',
      top: isWeb ? '2%' : '10%',
      left: '5%',
      color: '#0047D2',
      fontSize: 55 * scale,
      fontWeight: 'bold',
    },
    content: {
      flexDirection:'row',
      justifyContent: 'space-between', // Adjust alignment based on platform
    },
    image: {
      width: isWeb ? '360px' : 300,  // Use a fixed width for mobile
      height: isWeb ? '360px' : 200,  // Use a fixed height for mobile
    },
    textContainer: {
      width: isWeb ? '60%' : 'auto', // Responsive width for text container
      textAlign: 'center', // Center the text within the container
      paddingLeft: isWeb ? '0%' : 0, // Add padding for web
      paddingTop:'9%',
      paddingBottom: '10%',
    },
    bigText: {
      fontSize: 40 * scale,
      fontWeight: 'bold',
      marginBottom: '2%',
    },
    blueText: {
      color: '#0047d2',
      fontWeight: 'bold',
    },
    smallText: {
      color: '#524B6B',
      fontSize: 28 * scale,
    },
    button: {
      position: 'absolute',
      bottom: '20%',
      left: '70px',
      backgroundColor: '#0047d2',
      borderRadius: 10,
      padding: '1%',
      justifyContent: 'center',
      alignItems: 'center',
      width: 145,
      // width: isWeb ? 'auto' : 145,
      height: 45,
      display: 'flex',
      flexDirection: 'row',
      gap: 17,
    },
    button_text: {
      color:'white',
      fontSize: 27 * scale,
    },
  });
}
