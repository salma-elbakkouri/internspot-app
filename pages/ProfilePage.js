import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import BottomTabBar from '../components/BottomTabBar';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../config/firebase'; // Import Firebase auth
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, collection, addDoc, where, query, getDocs, getDoc, doc, updateDoc, setDoc } from 'firebase/firestore/lite';
import { db } from '../config/firebase';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';



export default function ProfilePage({ navigation }) {
  const navigation1 = useNavigation();
  const [user, setUser] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const q = query(collection(db, 'users'), where('email', '==', user.email));
        const querySnapshot = await getDocs(q);
        const userDocSnapshot = querySnapshot.docs[0];
        setUser(userDocSnapshot.data());
        setIsUserLoggedIn(true);
      } else {
        setIsUserLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    // Show confirmation alert
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              // Perform logout operation
              // For example, if you're using Firebase Authentication:
              await auth.signOut();

              // Remove items from AsyncStorage
              await AsyncStorage.removeItem('firstlaunch');
              await AsyncStorage.removeItem('interests');
              await AsyncStorage.removeItem('cookies');

              // Navigate to the login screen
              navigation1.navigate('Login');

            } catch (error) {
              console.error('Error signing out:', error.message);
              // Handle error if needed
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const formatDateRange = (startDateStr, endDateStr) => {
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    // Get the month and year for the start date
    const startMonthYear = startDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

    // Get the month and year for the end date
    const endMonthYear = endDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

    return `${startMonthYear} - ${endMonthYear}`;
};

  const generateAndPrintCV = async () => {
    try {
      // Generate HTML content for the CV
      const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Resume</title>
          <style>
              * {
                  box-sizing: border-box;
                  margin: 0;
                  padding: 0;
              }
      
              body {
                  font-family: Arial, sans-serif;
                  line-height: 1.6;
              }
      
              h1, h2, h3, h4, h5, h6 {
                  line-height: 1.2;
              }
      
              p {
                  margin-bottom: 10px;
              }
      
              .container {
                  max-width: 800px;
                  margin: 0 auto;
                  overflow: hidden;
              }
      
              .header {
                  background-color: #f4f4f4;
                  padding: 20px;
                  text-align: center;
              }
      
              .header img {
                  width: 150px;
                  height: 150px;
                  border-radius: 50%;
                  object-fit: cover;
              }
      
              .main-content {
                  padding: 20px;
              }
      
              .section {
                  margin-bottom: 30px;
              }
      
              .section-title {
                  font-size: 1.5em;
                  margin-bottom: 10px;
              }
      
              .section-title::after {
                  content: '';
                  display: block;
                  width: 50px;
                  height: 3px;
                  background-color: #333;
                  margin: 10px auto;
              }
      
              .section-content {
                  margin-left: 1em;
              }
      
              @media screen and (max-width: 768px) {
                  .header img {
                      width: 100px;
                      height: 100px;
                  }
              }
          </style>
      </head>
      <body>
      
      <div class="container">
          <div class="header">
              <img src="${user.profileImageUrl}" alt="Profile Picture">
              <h1>${user.firstName} ${user.lastName}</h1>
              <p>Student</p>
              <p>Email: ${user.email} | Phone: ${user.phoneNumber}</p>
          </div>
      
          <div class="main-content">
      
              <div class="section" id="education">
                  <h2 class="section-title">Education</h2>
                  ${
                    user.educations.map((edu) => `
                      <div class="section-content">
                          <p><strong>${edu.degree}</strong>,</p>
                          <p><strong>${edu.school}</strong>, ${formatDateRange(edu.start_date, edu.end_date)}</p>
                          <p>${edu.description}</p>
                      </div>
                    `).join('')
                  }
              </div>
      
              <div class="section" id="experience">
                  <h2 class="section-title">Work Experience</h2>
                  ${
                    user.experiences.map((exp) => `
                      <div class="section-content">
                          <p><strong>${exp.post_title}</strong></p>
                          <p><strong>${exp.company}</strong>, ${exp.specialization}, ${exp.location}, ${formatDateRange(exp.start_date, exp.end_date)}</p>
                          <p>${exp.description}</p>
                      </div>
                    `).join('')
                  }
              </div>
      
              <div class="section" id="skills">
                  <h2 class="section-title">Skills</h2>
                  <div class="section-content">
                    ${
                      user.skills.map((skill) => `
                        <span style="padding: 5px 10px; background-color: #f4f4f4; border-radius: 5px; margin-right: 10px; margin-top: 6px;">${skill}</span>
                      `).join('')
                    }
                  </div>
              </div>
      
          </div>
      </div>
      
      </body>
      </html>
      `;

      // Generate PDF from HTML
      const { uri } = await Print.printToFileAsync({ html: htmlContent });

      // Check if URI is valid
      if (!uri) {
        throw new Error('Generated PDF URI is invalid.');
      }

      // Get content URI for the PDF file
      const cUri = await FileSystem.getContentUriAsync(uri);

      // Launch default PDF viewer activity
      await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
        data: cUri,
        flags: 1,
        type: "application/pdf",
      });

      // Show success message
      Alert.alert('CV Downloaded', 'Your CV has been downloaded successfully.');
    } catch (error) {
      console.error('Error downloading CV:', error);
      Alert.alert('Error', 'An error occurred while downloading the CV.');
    }
  };

  const MenuItem = ({ icon, text, onPress }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <FontAwesome5 name={icon} size={20} color="#0047D2" />
      <Text style={styles.menuItemText}>{text}</Text>
    </TouchableOpacity>
  );

  const ProfileDetails = () => {
    return (
      <>
        <TouchableOpacity style={styles.editProfileButton} onPress={() => {
          navigation1.navigate('EditProfilePage');
        }}>
          <Text style={styles.editProfileButtonText}>Edit Profile</Text>
          <FontAwesome5 name="pen" size={14} color="white" style={{ marginLeft: 5 }} />
        </TouchableOpacity>
        <View style={styles.profileImageContainer}>
          <Image
            source={user.profileImageUrl ? { uri: user.profileImageUrl } : require('../assets/img-placeholder.png')}
            style={styles.profileImage}
          />
        </View>
        <Text style={styles.profileEmail}>{user.email}</Text>
        <Text style={styles.profileNumber}>{user.firstName} {user.lastName}</Text>

        <TouchableOpacity style={styles.downloadCvButton} onPress={generateAndPrintCV}>
          <Text style={styles.editProfileButtonText}>Download Resume</Text>
          <FontAwesome5 name="file" size={14} color="white" style={{ marginLeft: 5 }} />
        </TouchableOpacity>
      </>
    );
  };

  const UserNotLogined = () => {
    return (
      <View style={styles.UserNotLogined}>
        <TouchableOpacity style={styles.editProfileButton} onPress={() => {
          navigation1.navigate('Login');
        }}>
          <Text style={styles.editProfileButtonText}>Login</Text>
          <FontAwesome5 name="lock" size={14} color="white" style={{ marginLeft: 5 }} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Profile Details */}
      <ImageBackground source={require('../assets/bgimage.png')} style={styles.profileDetails}>
        {isUserLoggedIn ? <ProfileDetails /> : <UserNotLogined />}
      </ImageBackground>

      {/* Menu for Settings */}
      <View style={styles.settingsMenu}>
        <MenuItem icon="globe" text="Language" />
        <MenuItem icon="headset" text="Support" />
        <MenuItem icon="shield-alt" text="Privacy Policy" />
        <MenuItem icon="question" text="FAQ" />
        {isUserLoggedIn ? <MenuItem icon="sign-out-alt" text="Logout" onPress={handleLogout} /> : null}
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
    backgroundColor: 'white',
  },
  profileDetails: {
    alignItems: 'center',
    marginTop: 30,
  },
  editProfileButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    padding: 10,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginRight: 20,
    marginTop: 15,
  },
  downloadCvButton: {
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
    flexDirection: 'row',
    padding: 10,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginBottom: 10,
  },
  editProfileButtonText: {
    color: 'white',
    fontSize: 13,
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
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  menuItemText: {
    color: '#150B3D',
    marginLeft: 10,
  },
  UserNotLogined: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
});
