import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function ProfilesetupPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let's start creating your profile!</Text>

      <View style={styles.formContainer}>
        <Text style={styles.label}>First name</Text>
        <TextInput
          style={styles.input}
          placeholder=""
        />

        <Text style={styles.label}>Last name</Text>
        <TextInput
          style={styles.input}
          placeholder=""
        />

        <Text style={styles.label}>Email address</Text>
        <TextInput
          style={styles.input}
          placeholder=""
        />

        <Text style={styles.label}>Phone number</Text>
        <TextInput
          style={styles.input}
          placeholder=""
        />

        <Text style={styles.label}>Date of birth</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          type="date"
        />

        <Text style={styles.label}>State</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          // dropdown functionality
        />
      </View>

      <TouchableOpacity style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>

      <View style={styles.skipTextContainer}>
        <TouchableOpacity style={styles.skipTextButton}>
          <Text style={styles.skipText}>Skip to explore offers</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    color: '#000',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  nextButton: {
    backgroundColor: '#0047D2',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    borderRadius: 30,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  skipTextContainer: {
    alignItems: 'center',
    justifyContent:'center',
    flexDirection:'column',
  },
  skipTextButton: {
    marginTop: 10,
  },
  skipText: {
    color: '#0057FF',
    textDecorationLine: 'underline',
  },
});
