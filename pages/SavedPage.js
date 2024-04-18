import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import BottomTabBar from '../components/BottomTabBar';
import { auth } from '../config/firebase';
import { getFirestore, collection, addDoc, where, query, getDocs, getDoc, doc, updateDoc, setDoc } from 'firebase/firestore/lite';
import { db } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';

export default function SavedPage({ navigation, route }) {
  const navigation1 = useNavigation();
  const [offers, setOffers] = useState([]);
  const [hideOffers, setHideOffers] = useState(true);
  const [offersIds, setOffersIds] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setIsUserLoggedIn(true);
      } else {
        setIsUserLoggedIn(false);
      }
    });


    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isUserLoggedIn) {
      fetchSavedOffers();
      setHideOffers(false);
    }
  }, [isUserLoggedIn]);

  const fetchSavedOffers = async () => {
    try {
      const offersIdArray = [];

      const q = query(collection(db, 'users'), where('email', '==', user.email));
      const querySnapshot = await getDocs(q);

      // Using map instead of forEach to directly extract the savedOffers arrays
      querySnapshot.forEach(doc => {
        offersIdArray.push(doc.data().savedOffers);
      });

      // Flattening the array using concat() method
      const flatOffersArray = [].concat(...offersIdArray);

      setOffersIds(flatOffersArray);

      // Use a more descriptive name for clarity
      const fetchedOffers = await Promise.all(flatOffersArray.map(async id => {
        const docRef = doc(db, 'offers', id);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
      }));

      console.log('Fetched Offers: ', fetchedOffers.length);
      setOffers(fetchedOffers);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching offers: ', error);
    }
  };

  const toggleSelection = async (id) => {
    try {
      // Filter out the selected ID from the offersIds array
      const updatedOffersIds = offersIds.filter(offerId => offerId !== id);

      // Update the state with the new array
      setOffersIds(updatedOffersIds);

      // Retrieve the document reference
      const q = query(collection(db, 'users'), where('email', '==', user.email));
      const querySnapshot = await getDocs(q);
      const docRef = querySnapshot.docs[0].ref;

      // Update the document with the new offersIds
      await updateDoc(docRef, {
        savedOffers: updatedOffersIds,
      });

      // After updating the document, fetch the saved offers again
      fetchSavedOffers();
    } catch (error) {
      console.error('Error toggling selection: ', error);
    }
  };

  const handleOfferPress = (offer) => {
    navigation1.navigate('OfferdetailPage', { offer });
  };

  const filterPageNavigate = () => {
    navigation1.navigate('FilterOffersPage');
  }

  const renderItem = ({ item }) => {
    const index = offers.indexOf(item);
    const key = item.id + '-' + index;
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
        <TouchableOpacity style={styles.saveButton} onPress={() => toggleSelection(item.id)}>
          <FontAwesome name="bookmark" size={22}
            color={'#0047D2'}
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
              <Image source={require('../assets/companies/c5.png')} style={styles.logoImage} />
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
      {/* Search input and filter button */}
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
      {/* Recent offers text */}
      <Text style={styles.recentOffersText}>Saved Offers</Text>
      {!isUserLoggedIn ?
        <Text style={{ textAlign: 'center' }}>No saved offers</Text>
        :
        loading ? (
          <ActivityIndicator size="large" color="#0047D2" style={[styles.loadingSpin]} />
        ) : 
        offers.length === 0 ? (
          <Text style={{ textAlign: 'center' }}>No saved offers</Text>
        ) : (
          <FlatList
            data={offers}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingBottom: 60 }}
          />
        )
      }

      {/* Bottom tab bar with navigation prop */}
      <BottomTabBar navigation={navigation} />
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
    paddingHorizontal:15,
    backgroundColor: '#f2f2f2',
    borderRadius: 15,
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
  saveIconContainer: {
    position: 'absolute',
    top: 15,
    right: 15,
    padding: 5,
    borderRadius: 5,
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
  saveButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 8,
    borderRadius: 50,
  },
  loadingSpin: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});