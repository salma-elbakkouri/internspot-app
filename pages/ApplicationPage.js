import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import BottomTabBar from '../components/BottomTabBar';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { auth } from '../config/firebase'; // Ensure all these imports are correct

export default function ApplicationPage({ navigation }) {
  const navigation1 = useNavigation();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        fetchAppliedOffers(user);
      } else {
        setUser(null);
        setLoading(false); // Ensure we stop loading if no user is logged in
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchAppliedOffers = async (user) => {
    const db = getFirestore();
    try {
      const userRef = query(collection(db, 'users'), where('email', '==', user.email));
      const snapshot = await getDocs(userRef);
      if (!snapshot.empty) {
        const userData = snapshot.docs[0].data();
        const appliedOffersIds = userData.appliedOffers || [];
        const offers = await Promise.all(appliedOffersIds.map(async (id) => {
          const offerRef = doc(db, 'offers', id);
          const offerSnap = await getDoc(offerRef);
          return offerSnap.exists() ? { id: offerSnap.id, ...offerSnap.data() } : null;
        }));
        setApplications(offers.filter(Boolean)); // Filter out any null values
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching applied offers: ', error);
      setLoading(false); // Ensure loading is set to false even on error
    }
  };

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

  const renderItem = ({ item, index }) => (
    <View style={styles.applicationContainer}>
    <Image source={imagePaths[index % imagePaths.length]} style={styles.companyIcon} />
    <TouchableOpacity onPress={() => navigation1.navigate('ApplicationOfferDetail', { offer: item })}>
      <View style={styles.applicationDetails}>
        <Text style={styles.applicationTitle}>{item.title}</Text>
        <Text style={styles.companyName}>{item.additional_info.Entreprise}</Text>
      </View>
    </TouchableOpacity>
  </View>
);


  return (
    <View style={styles.container}>
      <Text style={styles.MyapplicationsText}>My Applications</Text>
      {loading ? (
        <View style={styles.centeredLoader}>
          <ActivityIndicator size="large" color="#0047D2" />
        </View>
      )  : applications.length === 0 ? (
        <View style={styles.centeredLoader}>
          <Text>No applications found</Text>
        </View>
      ) :  (
        <FlatList
          data={applications}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 60 }}
        />
      )}
      <BottomTabBar navigation={navigation} />
    </View>
  );

}

// Add your styles here if necessary


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  centeredLoader: {
    flex: 1, // Takes full height of the container
    justifyContent: 'center', // Center vertically
    alignItems: 'center' // Center horizontally
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
  MyapplicationsText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 70,
    marginBottom: 12,
    marginLeft: 10,
    color: 'black',
  },
  applicationContainer: {
    flexDirection: 'row',
    padding: 15,
    marginBottom: 15,
    borderRadius: 15,
    position: 'relative',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  companyIcon: {
    width: 50,
    height: 50,
    marginRight:10,
  },
  applicationDetails: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  applicationTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight:30,
  },
  companyName: {
    color: '#4A4A4A',
    marginBottom: 5,
  },
  applicationStatus: {
    borderRadius: 5,
  },
  statusText: {
    padding: 5,
    textAlign: 'center',
    fontSize: 12,
  },
  arrowIcon: {
    width: 32,
    height: 32,
    marginTop: 15,
  },
  centeredLoader: {
    flex: 1, // Takes full height of the container
    justifyContent: 'center', // Center vertically
    alignItems: 'center' // Center horizontally
  },
  
});