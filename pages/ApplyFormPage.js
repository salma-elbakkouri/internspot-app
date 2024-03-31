import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
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

      {/* Form */}
      <View style={styles.formContainer}>
        {/* Email Input */}
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="email address"
          placeholderTextColor="#666"
          onChangeText={setEmail}
          value={email}
        />

        {/* Full Name Input */}
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="full name"
          placeholderTextColor="#666"
          onChangeText={setFullName}
          value={fullName}
        />

        {/* Phone Number Input */}
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="+212"
          placeholderTextColor="#666"
          onChangeText={setPhoneNumber}
          value={phoneNumber}
          keyboardType="phone-pad"
        />

        {/* City Input */}
        <Text style={styles.label}>City</Text>
        <TextInput
          style={styles.input}
          placeholder="city"
          placeholderTextColor="#666"
          onChangeText={setCity}
          value={city}
        />

        {/* Job Input */}
        <Text style={styles.label}>Job</Text>
        <TextInput
          style={styles.input}
          placeholder="job"
          placeholderTextColor="#666"
          onChangeText={setJob}
          value={job}
        />

        {/* Activity Field Input */}
        <Text style={styles.label}>Activity Field</Text>
        <TextInput
          style={styles.input}
          placeholder="activity field"
          placeholderTextColor="#666"
          onChangeText={setActivityField}
          value={activityField}
        />

        {/* Education Level Input */}
        <Text style={styles.label}>Education Level</Text>
        <TextInput
          style={styles.input}
          placeholder="education level"
          placeholderTextColor="#666"
          onChangeText={setEducationLevel}
          value={educationLevel}
        />

        {/* Experience Years Input */}
        <Text style={styles.label}>Years of Experience</Text>
        <TextInput
          style={styles.input}
          placeholder="years of experience"
          placeholderTextColor="#666"
          onChangeText={setExperienceYears}
          value={experienceYears}
          keyboardType="numeric"
        />

        {/* Motivation Input */}
        <Text style={styles.label}>Motivation</Text>
        <TextInput
          style={[styles.input, { height: 100, textAlignVertical: 'top', paddingTop: 8 }]}
          placeholder="motivation"
          placeholderTextColor="#666"
          onChangeText={setMotivation}
          value={motivation}
          multiline
        />

        <View>
          <Text style={styles.label}>Upload Resume</Text>
          <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
            <Text style={styles.uploadButtonText}>Upload</Text>
          </TouchableOpacity>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
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
    top: 60,
    left: 20,
    zIndex: 1,
  },
  formContainer: {
    paddingTop: 90,
  },
  label: {
    fontSize: 16,
    color: 'black',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  submitButton: {
    backgroundColor: '#0047D2',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 'auto',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  uploadButton: {
    backgroundColor: 'gray',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
