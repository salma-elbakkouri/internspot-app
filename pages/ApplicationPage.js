import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import BottomTabBar from '../components/BottomTabBar';

export default function ApplicationPage({ navigation }) {
  const applications = [
    { id: '1', status: 'Application Sent', title: 'Junior UX Designer', company: 'Amazon' },
    { id: '2', status: 'Application Accepted', title: 'Software Engineer', company: 'Google' },
    { id: '3', status: 'Application Rejected', title: 'Marketing Specialist', company: 'Oracle' },
  ];

  const appliedOffers = ({ item }) => (
    <View style={styles.applicationContainer}>
      {/* Amazon Icon */}
      <Image source={require('../assets/amazon.jpg')} style={styles.companyIcon} />
      {/* Application details */}
      <TouchableOpacity>
        <View style={styles.applicationDetails}>
          <Text style={styles.applicationTitle}>{item.title}</Text>
          <Text style={styles.companyName}>{item.company}</Text>
          {/* Application status */}
          {/* <View style={[styles.applicationStatus, getStatusStyle(item.status)]}>
          <Text style={[styles.statusText, getStatustextStyle(item.status)]}>{item.status}</Text>
        </View> */}
        </View>
        {/* Arrow Icon */}
        {/* <Image source={require('../assets/arrow.png')} style={styles.arrowIcon} /> */}
      </TouchableOpacity>
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
      <Text style={styles.MyapplicationsText}>My Applications</Text>
      {/* Flatlist for applications */}
      <FlatList
        data={applications}
        renderItem={appliedOffers}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 60 }}
      />
      {/* Bottom tab bar with navigation prop */}
      <BottomTabBar navigation={navigation} state={{ routeNames: ['Home', 'Saved', 'Application', 'Notification', 'Profile'], index: 2 }} />
    </View>
  );
}

// Function to get style based on application status
const getStatustextStyle = (status) => {
  switch (status) {
    case 'Application Sent':
      return {
        color: '#0047D2', // Text color for Application Sent
      };
    case 'Application Accepted':
      return {
        color: '#0D8728', // Text color for Application Accepted
      };
    case 'Application Rejected':
      return {
        color: '#FF4242', // Text color for Application Rejected
      };
    default:
      return {};
  }
}


// Function to get style based on application status
const getStatusStyle = (status) => {
  switch (status) {
    case 'Application Sent':
      return {
        backgroundColor: '#e8f0ff',
        padding: 2,
        width: 130,
      };
    case 'Application Accepted':
      return {
        backgroundColor: '#d2ffdc',
        padding: 2,
        width: 130,
      };
    case 'Application Rejected':
      return {
        backgroundColor: '#ffd9d9',
        padding: 2,
        width: 130,
      };
    default:
      return {};
  }
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
  MyapplicationsText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 30,
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
    borderRadius: 25,
    marginRight: 10,
  },
  applicationDetails: {
    flex: 1,
  },
  applicationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
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
});
