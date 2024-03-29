import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import BottomTabBar from '../components/BottomTabBar';

export default function ProfilePage({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Profile Details */}
      <ImageBackground source={require('../assets/bgimage.png')} style={styles.profileDetails}>
        <TouchableOpacity style={styles.editProfileButton}>
          <Text style={styles.editProfileButtonText}>Edit Profile</Text>
          <FontAwesome5 name="pen" size={14} color="white" style={{ marginLeft: 5 }} />
        </TouchableOpacity>
        <View style={styles.profileImageContainer}>
          <Image source={require('../assets/profilepic.png')} style={styles.profileImage} />
        </View>
        <Text style={styles.profileEmail}>student.mail@gmail.com</Text>
        <Text style={styles.profileNumber}>Number: 0648759615</Text>
      </ImageBackground>
      
      {/* Menu for Settings */}
      <View style={styles.settingsMenu}>
        <MenuItem icon="globe" text="Language" />
        <MenuItem icon="headset" text="Support" />
        <MenuItem icon="shield-alt" text="Privacy Policy" />
        <MenuItem icon="question" text="FAQ" />
        <MenuItem icon="sign-out-alt" text="Logout" />
      </View>

      {/* Bottom tab bar with navigation prop */}
      <BottomTabBar navigation={navigation} state={{ routeNames: ['Home', 'Saved', 'Application', 'Notification', 'Profile'], index: 4 }} />
    </View>
  );
}

const MenuItem = ({ icon, text }) => (
  <View style={styles.menuItem}>
    <FontAwesome5 name={icon} size={20} color="#0047D2" />
    <Text style={styles.menuItemText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
  },
  profileDetails: {
    alignItems: 'center',
    marginTop: 30,
  },
  editProfileButton: {
    backgroundColor: '#222c90',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    padding: 10,
    borderRadius: 5,
    marginRight: 20,
    marginTop: 15,
  },
  editProfileButtonText: {
    color: 'white',
    fontSize:13,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginBottom: 10,
    marginTop: 40,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileEmail: {
    color: 'white',
    marginBottom: 5,
  },
  profileNumber: {
    color: 'white',
    marginBottom: 20,
  },
  settingsMenu: {
    marginTop: 20,
    paddingVertical: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom:20,
    backgroundColor: '#f9f9f9',
  },
  menuItemText: {
    color: '#150B3D',
    marginLeft: 10,
  },
});
