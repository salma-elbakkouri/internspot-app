import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, FlatList, ActivityIndicator, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function offerCard({item, offers, userSavedOffers, handleSaveOffer, handleOfferPress}) {
    // const index = offers.indexOf(item);
    // const key = item.id + '-' + index;
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
            color={userSavedOffers.includes(item.id) ? 'black' : 'lightgray'}
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
}
const renderItem = ({ item }) => {
    
  };