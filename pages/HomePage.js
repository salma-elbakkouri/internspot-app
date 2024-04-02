import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import BottomTabBar from '../components/BottomTabBar';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../config/firebase'; // Import Firebase auth
import { getFirestore, collection, addDoc, where, query, getDocs, getDoc, doc, updateDoc, setDoc } from 'firebase/firestore/lite'; // Import where, query, getDocs, doc, updateDoc, setDoc
import { db } from '../config/firebase';



export default function Home({ navigation, route }) {
  const skiped = route.params?.skiped;

  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedItems, setSelectedItems] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [data, setData] = useState([]);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        fetchUserData(user.email);
      } else {
        // Handle case when user is not signed in
        // Alert.alert('Error', 'User not signed in.');
        // Optionally, you can navigate to the login screen here
        // navigation.navigate('Login');
        const fetchInterests = async () => {
          if (skiped) {
            try {
              const interestsJson = await AsyncStorage.getItem('interests');
              if (interestsJson !== null) {
                const interests = JSON.parse(interestsJson);
                console.log('Retrieved Interests:', interests); // Debugging
                // Set your state with the fetched interests
              }
            } catch (error) {
              console.error('Error fetching interests:', error);
            }
          } else {
            console.log('User has not skipped the interests page');
          }
        };
      
        fetchInterests();
      }
    });

    return () => unsubscribe(); // Cleanup function
  }, []);

  const fetchHomeOffers = async (interests) => {
    console.log('Fetching home offers for interests:', interests);
  
    try {
      const offers = [];
  
      // Construct a Firestore query for each interest and parameter
      for (const interest of interests) {
        if (interest) {
          const dataOffers = await getDocs(collection(db, 'offers'));
  
          dataOffers.forEach((doc) => {
            const { title, additional_info, description } = doc.data();
  
            if (title.includes(interest) || 
                (additional_info?.Fonction?.includes(interest) || additional_info?.Domaine?.includes(interest)) || 
                description.includes(interest)) {
              offers.push({ id: doc.id, ...doc.data() });
            }
          });
        }
      }
  
      // Sort offers by Posted_Date from newest to oldest
      offers.sort((a, b) => new Date(b.general_info.Posted_Date) - new Date(a.general_info.Posted_Date));
  
      // Set data and loading state after all offers have been fetched and sorted
      setData(offers);
      setLoading(false);
  
    } catch (error) {
      console.error('Error fetching home offers:', error);
      // Handle error as needed
    }
  };

  const fetchUserData = async (email) => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, 'users'), where('email', '==', email))
      );

      if (!querySnapshot.empty) {
        // Assuming there's only one document for each user email
        const userData = querySnapshot.docs[0].data();

        const interestsList = userData.interests || [];
        setInterests(interestsList);

        fetchHomeOffers(interestsList);
        
      } else {
        console.log('No such document!');
        setInterests([]);
      }
    } catch (error) {
      console.error('Error fetching user document:', error);
      setInterests([]);
    }
  };

  const toggleSelection = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(item => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
    if (savedItems.includes(id)) {
      setSavedItems(savedItems.filter(item => item !== id));
    } else {
      setSavedItems([...savedItems, id]);
    }
  };

  const navigation1 = useNavigation();

  const isItemSelected = (id) => {
    return selectedItems.includes(id);
  };

  const handleOfferPress = (offer) => {
    navigation1.navigate('OfferdetailPage', { offer });
  };

  const handleSaveOffer = (offer) => {
    toggleSelection(offer.id);
    console.log('Saving offer:', offer);
  };

  const renderItem = ({ item }) => {
    // Convert Posted_Date string to Date object
    const postedDate = new Date(item.general_info.Posted_Date);
  
    // Get the current date and time
    const currentDate = new Date();
  
    // Calculate the time difference in milliseconds
    const timeDifference = currentDate - postedDate;
  
    // Convert milliseconds to seconds, minutes, hours, and days
    const secondsDifference = Math.floor(timeDifference / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = Math.floor(minutesDifference / 60);
    const daysDifference = Math.floor(hoursDifference / 24);
  
    // Determine the appropriate time unit to display
    let timeAgo;
    if (daysDifference > 0) {
      timeAgo = `${daysDifference} day${daysDifference > 1 ? 's' : ''} ago`;
    } else if (hoursDifference > 0) {
      timeAgo = `${hoursDifference} hour${hoursDifference > 1 ? 's' : ''} ago`;
    } else if (minutesDifference > 0) {
      timeAgo = `${minutesDifference} minute${minutesDifference > 1 ? 's' : ''} ago`;
    } else {
      timeAgo = `${secondsDifference} second${secondsDifference > 1 ? 's' : ''} ago`;
    }
  
    return (
      <View style={styles.offerContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={() => handleSaveOffer(item)}>
          <FontAwesome name="bookmark" size={24} 
            color={selectedItems.includes(item.id) ? 'black' : 'lightgray'}
          ></FontAwesome>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleOfferPress(item)}>
          <View style={styles.offerContent}>
            <Text style={styles.postedText}>Posted {timeAgo}</Text>
            <Text style={styles.titleText}>{item.title}</Text>
            <View style={styles.detailsContainer}>
              <Text style={styles.durationText}>Salaire  -</Text>
              <View style={styles.typeContainer}>
                <Text style={styles.typeText}>{item.additional_info.Salaire}</Text>
              </View>
            </View>
            <View style={styles.companyContainer}>
              <Image source={require('../assets/amazon.jpg')} style={styles.logoImage} />
              <View style={styles.companyDetails}>
                <Text style={styles.companyName}>{item.additional_info.Entreprise}</Text>
                <Text style={styles.location}>{item.general_info.City}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="lightgray"
        />
        <TouchableOpacity style={styles.filterButton}>
          <Image source={require('../assets/filtericon.png')} style={styles.filterIcon} />
        </TouchableOpacity>
      </View>
      <Text style={styles.recentOffersText}>Recent Offers</Text>
      {loading ? 
        <ActivityIndicator size="large" color="#0047D2" style={[styles.loadingSpin]} />
        : 
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 60 }}
        />
      }
      <BottomTabBar navigation={navigation} savedItems={savedItems} />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 60,
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: 'white',
    color: 'black',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 1,
  },
  filterButton: {
    padding: 8,
    marginLeft: 10,
    backgroundColor: '#0047D2',
    borderRadius: 10,
  },
  filterIcon: {
    width: 19,
    height: 21,
  },
  recentOffersText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 12,
    marginLeft: 10,
    color: 'black',
  },
  offerContainer: {
    backgroundColor: '#F9F9F9',
    padding: 15,
    marginBottom: 15,
    borderRadius: 15,
    marginLeft: 5,
    marginRight: 5,
    flexDirection: 'row',
    position: 'relative',
  },
  saveButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    padding: 8,
    borderRadius: 50,
  },
  offerContent: {
    flex: 1,
  },
  postedText: {
    color: '#4A4A4A',
    marginBottom: 5,
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailsContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  durationText: {
    color: '#4A4A4A',
    marginRight: 10,
  },
  typeContainer: {
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
    paddingHorizontal: 5,
  },
  typeText: {
    color: '#4A4A4A',
  },
  logoImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
  },
  companyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  companyDetails: {
    marginLeft: 10,
  },
  companyName: {
    fontWeight: 'bold',
  },
  location: {
    color: '#4A4A4A',
  },
  loadingSpin: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
