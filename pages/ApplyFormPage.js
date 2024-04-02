import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore/lite';
import { DocumentPicker } from 'expo-document-picker';



// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSLvtOwLYJ45f4-AwacbZp9PfHoYpfYcU",
  authDomain: "internspot-app-project.firebaseapp.com",
  projectId: "internspot-app-project",
  storageBucket: "internspot-app-project.appspot.com",
  messagingSenderId: "964331089168",
  appId: "1:964331089168:web:5b64ff3f0eb719c24f0995",
  measurementId: "G-PZ02B7H27R"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export default function ApplyFormPage({ navigation }) {
  // State variables to store form inputs
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [motivation, setMotivation] = useState('');
  const [activityField, setActivityField] = useState('');
  const [job, setJob] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  const [experienceYears, setExperienceYears] = useState('');
  const [city, setCity] = useState('');

  // Function to handle navigation back
  const handleBack = () => {
    navigation.goBack();
  };

  // Function to handle form submission
  const handleSubmit = () => {
    // Check if any field is empty
    if (!email || !fullName || !phoneNumber || !motivation || !activityField || !job || !educationLevel || !experienceYears || !city) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }



    // Add application to Firestore collection
    addDoc(collection(db, 'applications'), {
      email,
      fullName,
      phoneNumber,
      motivation,
      activityField,
      job,
      educationLevel,
      experienceYears,
      city,
    })
      .then(() => {
        // Application added successfully
        Alert.alert('Success', 'Application submitted successfully.');
        // Clear form fields after submission
        setEmail('');
        setFullName('');
        setPhoneNumber('');
        setMotivation('');
        setActivityField('');
        setJob('');
        setEducationLevel('');
        setExperienceYears('');
        setCity('');
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        Alert.alert('Error', 'Failed to submit application. Please try again.');
      });
  };


  // Define the handleUpload function to handle the upload action
  const handleUpload = async () => {
    try {
      const document = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf', // Specify the file type you want to allow (e.g., PDF)
      });

      // Check if a document was picked
      if (document.type === 'success') {
        // Document picked successfully, now you can upload it
        const { uri, name } = document;
        // Implement the logic to upload the file (e.g., to Firebase Storage or Firestore)
        // You can use the 'uri' and 'name' properties to access the file data
        // ex: const response = await uploadFileToFirebase(uri, name);
        // Handle the response as needed
        console.log('File picked:', document);
      } else {
        // User canceled the document picker
        console.log('Document picker canceled');
      }
    } catch (error) {
      // Handle any errors that occur during document picking
      console.error('Error picking document:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <FontAwesome name="arrow-left" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.pageContent}>
        <View style={styles.profileSection}>
          <View style={styles.infoProfile}>
            <Text style={styles.name}>Hicham Amazigh</Text>
            <Text style={styles.title}>Software Developer</Text>
          </View>
          <TouchableOpacity style={styles.editProfileBtn}>
            <AntDesign name="edit" size={28} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.cardBlock}>
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons name="contacts-outline" size={24} color="#0047D2" />
            <Text style={styles.ContactTitle}>Contact Information</Text>
          </View>
          <Text style={styles.CardText}>Sidi moussa, Salé, Rabat</Text>
          <Text style={styles.CardText}>+212612345678</Text>
          <Text style={styles.CardText}>student@gmail.com</Text>
        </View>

        <View style={styles.cardBlock}>
          <View style={styles.cardHeader}>
            <Ionicons name="newspaper-outline" size={24} color="#0047D2" />
            <Text style={styles.ContactTitle}>Summary</Text>
          </View>
          <Text style={styles.CardText}>Hello, my name is Hicham, and I'm a UX/UI design student with a passion for crafting seamless and engaging user experiences.</Text>
        </View>

        <View style={styles.cardBlock}>
          <View style={styles.cardHeader}>
            <Ionicons name="school-outline" size={24} color="#0047D2" />
            <Text style={styles.ContactTitle}>Education</Text>
          </View>
          <View style={styles.educationItem}>
            <Text style={styles.CardEducationTitle}>Mobile applications engineer</Text>
            <Text style={styles.CardText}>License degree, High school of technology of Salé</Text>
            <Text style={styles.CardText}>Oct 2023 - July 2024</Text>
          </View>
          <View style={styles.educationItem}>
            <Text style={styles.CardEducationTitle}>Mobile applications engineer</Text>
            <Text style={styles.CardText}>License degree, High school of technology of Salé</Text>
            <Text style={styles.CardText}>Oct 2023 - July 2024</Text>
          </View>
        </View>

        <View style={styles.cardBlock}>
          <View style={styles.cardHeader}>
            <Ionicons name="school-outline" size={24} color="#0047D2" />
            <Text style={styles.ContactTitle}>Experience</Text>
          </View>
          <View style={styles.educationItem}>
            <Text style={styles.CardEducationTitle}>Full Stack Developer</Text>
            <Text style={styles.CardText}>CEGEDIM - Rabat, Rabat-Salé-Kénitra, Maroc (Hybride)</Text>
            <Text style={styles.CardText}>Oct 2023 - July 2024</Text>
          </View>
          <View style={styles.educationItem}>
            <Text style={styles.CardEducationTitle}>Full Stack Developer</Text>
            <Text style={styles.CardText}>CEGEDIM - Rabat, Rabat-Salé-Kénitra, Maroc (Hybride)</Text>
            <Text style={styles.CardText}>Oct 2023 - July 2024</Text>
          </View>
        </View>

        {/* Apply button */}
        <View style={styles.applyButtonContainer}>
            <TouchableOpacity style={styles.applyButton}>
                <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 999,
  },
  pageContent: {
    flex: 1,
    marginTop: 70,
    flexDirection: 'column',
  },
  profileSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
    marginRight: 5,
    marginBottom: 40,
  },
  editProfileBtn: {
    zIndex: 999,
  },
  infoProfile: {
    flexDirection: 'column',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
  },
  cardBlock: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  ContactTitle: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  CardText: {
    fontSize: 16,
  },
  CardEducationTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 5,
  },
  educationItem: {
    flexDirection: 'column',
    marginBottom: 6,
  },
  applyButton: {
    backgroundColor: '#0047D2',
    borderRadius: 20,
    paddingVertical: 15,
    position: 'absolute',
    bottom: 10,
    left: 20,
    right: 20,
  },
  applyButtonContainer: {
      backgroundColor: 'white',
      width: '100%',
      height: 70,
      padding: 10
  },
  applyButtonText: {
      color: 'white',
      fontSize: 16,
      textAlign: 'center',
  },
});
