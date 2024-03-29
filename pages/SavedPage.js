import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import BottomTabBar from '../components/BottomTabBar'; // Import BottomTabBar component

export default function SavedPage({ navigation, route }) {
  // const savedItems = route.params?.savedItems || [];
  const [savedItems, setSavedItems] = useState([
    { id: '1', posted: '5 days ago', title: 'Junior UX Designer', duration: '6 months', type: 'Full Time Hybrid', company: 'Amazon', location: 'Sale Rabat, Morocco' },
    { id: '2', posted: '1 hour ago', title: 'Software Engineer', duration: '12 months', type: 'Remote', company: 'Google', location: 'Mountain View, CA' },
    { id: '3', posted: '2 mins ago', title: 'Marketing Specialist', duration: '3 months', type: 'Part Time', company: 'Facebook', location: 'Menlo Park, CA' },
    { id: '4', posted: '2 mins ago', title: 'Marketing Specialist', duration: '3 months', type: 'Part Time', company: 'Facebook', location: 'Menlo Park, CA' },
    { id: '5', posted: '2 mins ago', title: 'Marketing Specialist', duration: '3 months', type: 'Part Time', company: 'Facebook', location: 'Menlo Park, CA' },
    { id: '6', posted: '2 mins ago', title: 'Marketing Specialist', duration: '3 months', type: 'Part Time', company: 'Facebook', location: 'Menlo Park, CA' },
  ]);
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleSelection = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(item => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }

    // Remove the item from savedItems if it exists
    const index = savedItems.findIndex(item => item.id === id);
    if (index !== -1) {
      const newSavedItems = [...savedItems];
      newSavedItems.splice(index, 1);
      setSavedItems(newSavedItems);
    }
  };
  

  const renderItem = ({ item }) => (
    <View style={styles.offerContainer}>
      <TouchableOpacity
        style={[
          styles.saveIconContainer,
        ]}
        onPress={() => toggleSelection(item.id)} // Call toggleSelection with item id
      >
        <FontAwesome5
          name="bookmark"
          size={20}
          color="#0047D2" // Always blue since these are saved items
        />
      </TouchableOpacity>

      {/* Offer content */}
      <View style={styles.offerContent}>
        <Text style={styles.postedText}>{item.posted}</Text>
        <Text style={styles.titleText}>{item.title}</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.durationText}>{item.duration}</Text>
          <View style={styles.typeContainer}>
            <Text style={styles.typeText}>{item.type}</Text>
          </View>
        </View>
        <View style={styles.companyContainer}>
          {/* Assuming you have image assets for companies */}
          <Image source={require('../assets/amazon.jpg')} style={styles.logoImage} />
          <View style={styles.companyDetails}>
            <Text style={styles.companyName}>{item.company}</Text>
            <Text style={styles.location}>{item.location}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Search input and filter button */}
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
      {/* Recent offers text */}
      <Text style={styles.recentOffersText}>Saved Offers</Text>
      {/* Flatlist for saved offers */}
      <FlatList
        data={savedItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 60 }}
      />
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
});