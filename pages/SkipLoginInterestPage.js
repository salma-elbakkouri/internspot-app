import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore/lite';
import { db } from '../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SkipLoginInterestPage({ route }) {
  const skiped = route.params.skiped;
  const user = route.params?.user;
  const OfferdetailPageRedirect = route.params?.OfferdetailPageRedirect;

  const navigation = useNavigation(); 

  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hisfirstlaunch, sethisfirstlaunch] = useState(true);
  const [defaultInterests, setDefaultInterests] = useState([]);

  const isFirstlaunch = async () => {
    AsyncStorage.getItem('firstlaunch').then((value) => {
      if (value == null) {
        AsyncStorage.setItem('firstlaunch', 'false');
        sethisfirstlaunch(true);
      } else {
        sethisfirstlaunch(false);
        navigation.navigate('Home', {skiped: true});
      }
    });
  }

  useEffect( async () => {
    const isUserComeFromOfferPage = async () => {
      if (OfferdetailPageRedirect) {
        const interestsJson = await AsyncStorage.getItem('interests');
        const savedInterests = JSON.parse(interestsJson);
  
        await addDoc(collection(db, 'users'), {
          email: user.email,
          interests: savedInterests,
        });
  
        navigation.navigate('OfferdetailPage', { 
          offer: route.params.offer,
          comeFromLoginPage: true,
        });
      }
    };
    
    isUserComeFromOfferPage();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'interests'));
        const interestsData = [];
        querySnapshot.forEach((doc) => {
          interestsData.push(doc.data().name);
        });
        setInterests(interestsData);
        setDefaultInterests(interestsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching interests:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const [selectedInterests, setSelectedInterests] = useState([]);

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(item => item !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  }; 

  const isInterestSelected = (interest) => {
    return selectedInterests.includes(interest);
  };

  navigateToHomePage = () => {
    AsyncStorage.setItem('interests', JSON.stringify(selectedInterests))
      .then(() => {
        console.log('Selected Interests:', selectedInterests);
        AsyncStorage.setItem('firstlaunch', 'false');
        navigation.navigate('Home', { skiped: true });
      })
      .catch((error) => {
        console.error('Error setting interests:', error);
      });
  };

  navigateProsileSetupPage = async () => {
    await addDoc(collection(db, 'users'), {
      email: user.email,
      interests: selectedInterests,
    });
    
    navigation.navigate('ProfilesetupPage', { user });
  };

  const filterSkills = (val) => {
    if (val !== '') {
      console.log('Filtering skills:', val);
      // Filter the interests array based on the search value (val)
      const filteredInterests = defaultInterests.filter((interest) =>
        interest.toLowerCase().includes(val.toLowerCase())
      );
      // Update the interests state with the filtered array
      setInterests(filteredInterests);
    } else {
      // If the search value is empty, return data to default
      // Set interests back to its default state (assuming it's initialized with the default data)
      setInterests(defaultInterests);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let's choose your interest!</Text>
      <TextInput
        style={styles.input}
        onChangeText={(val) => filterSkills(val)}
        placeholder="Search"
        placeholderTextColor="lightgray"
      />
      <ScrollView style={styles.interestsContainer}>
        <View style={styles.checkboxContainer}>
        {loading ? (
            <ActivityIndicator size="large" color="#0047D2" style={[styles.loadingSpin]} />
          ) : (
            <View style={styles.interestsContainer}>
              <View style={styles.checkboxContainer}>
                {interests.map(interest => (
                  <TouchableOpacity
                    key={interest}
                    style={[styles.checkboxButton, isInterestSelected(interest) && styles.selected]}
                    onPress={() => toggleInterest(interest)}
                  >
                    <Text style={[styles.checkboxText, isInterestSelected(interest) && styles.selectedText]}>{interest}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => {
          if (selectedInterests.length > 0) {
            skiped ? navigateToHomePage() : navigateProsileSetupPage();
          } else {
            // Show popup
            Alert.alert(
              'Choose at least one interest',
              'Please select at least one interest before continuing.',
              [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
            );
          }
        }}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    marginTop: 70,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    elevation: 2,
  },
  interestsContainer: {
    width: '100%',
    maxHeight: '72%',
  },
  checkboxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  checkboxButton: {
    width: '48%',
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxText: {
    color: 'black',
  },
  selected: {
    backgroundColor: '#0047D2',
  },
  selectedText: {
    color: '#fff',
  },
  continueButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#0047D2',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingSpin: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
