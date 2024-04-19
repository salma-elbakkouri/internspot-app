import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, FlatList, ActivityIndicator, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import BottomTabBar from '../components/BottomTabBar';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../config/firebase'; // Import Firebase auth
import { getFirestore, collection, addDoc, where, query, getDocs, getDoc, doc, updateDoc, setDoc } from 'firebase/firestore/lite';
import { db } from '../config/firebase';


export default function Home({ navigation, route }) {
  const skiped = route.params?.skiped;
  const userData = route.params?.user || null;

  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedItems, setSelectedItems] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [data, setData] = useState([]);
  const [userSavedOffers, setUserSavedOffers] = useState([]);
  const [user, setUser] = useState(null);

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsUserLoggedIn(true);
      } else {
        setIsUserLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        fetchUserData(user.email);
      } else {
        const fetchInterests = async () => {
          if (skiped) {
            try {
              const interestsJson = await AsyncStorage.getItem('interests');
              if (interestsJson !== null) {
                const interests = JSON.parse(interestsJson);
                // Set your state with the fetched interests
                fetchHomeOffers(interests);
              } else {
                console.log('No interests found in AsyncStorage');
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

  useEffect(() => {
    const fetchData = async () => {
      await loadSavedOffers();
    };

    fetchData();
  }, []);

  const loadSavedOffers = async () => {
    if (isUserLoggedIn) {
      const userRef = collection(db, 'users');

      try {
        const userQuerySnapshot = await getDocs(query(userRef, where('email', '==', user.email)));

        if (!userQuerySnapshot.empty) {
          // Assuming there's only one document for each user email
          const userData = userQuerySnapshot.docs[0].data();

          // Use userData as needed
          console.log('User offers:', userData.savedOffers.flat());
          setUserSavedOffers(userData.savedOffers.flat());
        } else {
          console.log('No user found with email:', user.email);
        }
      } catch (error) {
        console.error("Error fetching user offers:", error);
      }
    }
  };

  const fetchHomeOffers = async (interests) => {
    try {
      const offers = [];

      // Construct a Firestore query for each interest and parameter
      for (var interest of interests) {
        if (interest === 'Web Development') {
          interest = 'Laravel';
        }
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
      if (offers.length === 0) {
        const offerData = await getDocs(collection(db, 'offers'));
        offerData.forEach((doc) => {
          offers.push({ id: doc.id, ...doc.data() });
        });
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

  const toggleSelection = async (id) => {
    try {
      const userRef = collection(db, 'users');
      const userQuerySnapshot = await getDocs(query(userRef, where('email', '==', user.email)));

      if (!userQuerySnapshot.empty) {
        // Assuming there's only one document for each user email
        const userDocRef = userQuerySnapshot.docs[0].ref;
        const userDocSnapshot = await getDoc(userDocRef);
        const userData = userDocSnapshot.data();

        if (userData) {
          const savedOffers = userData.savedOffers || [];
          const updatedSavedOffers = savedOffers.includes(id) ? savedOffers.filter(item => item !== id) : [...savedOffers, id];

          await updateDoc(userDocRef, {
            savedOffers: updatedSavedOffers,
          });

          setUserSavedOffers(updatedSavedOffers);
          loadSavedOffers();
        } else {
          console.log('No user data found');
        }
      } else {
        console.log('No user found with email:', user.email);
      }
    } catch (error) {
      console.error("Error updating saved items:", error);
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
    if (!isUserLoggedIn) {
      Alert.alert(
        'Error',
        'Please login to save this offer.',
        [
          {
            text: 'Login',
            onPress: () => navigation1.navigate('Login'),
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
        { cancelable: false }
      );

    } else {
      toggleSelection(offer.id);
    }
  };

  const filterPageNavigate = () => {
    navigation1.navigate('FilterOffersPage');
  }

  const navigateToFilterPage = () => {
    navigation1.navigate('FilterOptionsPage');
  }

  const renderItem = ({ item, index }) => {
    const key = item.id + '-' + index;


    const imagePaths = [
      require('../assets/companies/c19.png'),
      require('../assets/companies/c7.png'),
      require('../assets/companies/c10.png'),
      require('../assets/companies/c16.png'),
      require('../assets/companies/c12.png'),
      require('../assets/companies/c13.png'),
      require('../assets/companies/c14.png'),
      require('../assets/companies/c15.png'),
      require('../assets/companies/c5.png'),
      require('../assets/companies/c17.png'),
      require('../assets/companies/c18.png'),
      require('../assets/companies/c19.png'),
    ];

    const image = imagePaths[index % imagePaths.length];

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
          <FontAwesome name="bookmark" size={22}
            color={userSavedOffers.includes(item.id) ? '#0047D2' : 'lightgray'}
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
            <Image source={image} style={styles.logoImage} />
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
        <TextInput onPressIn={filterPageNavigate}
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="lightgray"
        />
        {/* <TouchableOpacity onPress={navigateToFilterPage} style={styles.filterButton}>
          <Image source={require('../assets/filtericon.png')} tintColor={'white'} style={styles.filterIcon} />
        </TouchableOpacity> */}
      </View>
      <Text style={styles.recentOffersText}>Recent Offers</Text>
      {loading ?
        <ActivityIndicator size="large" color="#0047D2" style={[styles.loadingSpin]} />
        :
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.id + '-' + index}
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
    width: '100%',
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
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
    top: 8,
    right: 8,
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
    fontSize: 14,
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
    width: 60,
    height: 60,
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