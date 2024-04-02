import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const OfferdetailsPage = ({ route, navigation }) => {
    const { offer } = route.params;

    const [applied, setApplied] = React.useState(true);
    // const handelApplyPage = () => {
    //     navigation.navigate('ApplyFormPage', { offer });
    // }
    const handelApplyPage = () => {
        navigation.navigate('ApplyWebView', { url: `https://www.marocannonces.com/${offer.apply_link}` });
        setApplied(true);
    }

    const handleGoBack = () => {
        console.log('Go back');
        navigation.goBack();
    };

    // Function to handle saving/un-saving offer
    const handleSaveOffer = () => {
        // Your logic for saving/un-saving offer goes here
    };

    // Convert Posted_Date string to Date object
    const postedDate = new Date(offer.general_info.Posted_Date);
  
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
        <View style={styles.container}>
            {/* Back button */}
            <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                <FontAwesome name="chevron-left" size={24} color="#0047D2" />
            </TouchableOpacity>

            {/* Save button */}
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveOffer}>
                <FontAwesome name="bookmark" size={24} color="#0047D2" />
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Offer picture */}
                <Image 
                    source={{ uri: 'https://images.squarespace-cdn.com/content/v1/535552d9e4b0021ca53b2d3d/1596746988776-YA89SSJGLKP59NQLDNEO/Random_Branding_Logo.gif' }} 
                    style={styles.offerPicture} 
                    resizeMode="contain" 
                />

                {/* Offer details */}
                <Text style={styles.companyName}>{offer.additional_info.Entreprise}</Text>
                <Text style={styles.location}>{offer.general_info.City}</Text>
                <Text style={styles.offerTitle}>{offer.title}</Text>

                {/* More details */}
                <View style={styles.moreDetails}>
                    <Text style={styles.posted}>Posted {timeAgo}</Text>
                    <Text style={styles.sectionTitle}>Details</Text>
                    <View style={styles.offerDetailsData}>
                        <Text>Domaine : {offer.additional_info.Domaine}</Text>
                        <Text>Fonction : {offer.additional_info.Fonction}</Text>
                        <Text>Contrat : {offer.additional_info.Contrat}</Text>
                        <Text>Entreprise : {offer.additional_info.Entreprise}</Text>
                        <Text>Salaire : {offer.additional_info.Salaire}</Text>
                        <Text>Niveau d'études : {offer.additional_info['Niveau d\'études']}</Text>
                    </View>

                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.description}>{offer.description}</Text>

                </View>
            </ScrollView>

            {/* Apply button */}
            <View style={styles.applyButtonContainer}>
                <TouchableOpacity style={styles.applyButton} onPress={handelApplyPage}>
                    <Text style={styles.applyButtonText}>Apply</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        position: 'relative',
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 20,
        paddingTop: 100, // Adjust this value based on your design
        paddingBottom: 70, // Adjust this value based on your design
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 999, // Set a higher zIndex value
        height: 30,
        width: 30,
    },
    saveButton: {
        position: 'absolute',
        top: 50,
        right: 20,
        zIndex: 999, // Set a higher zIndex value
        height: 30,
        width: 30,
    },
    offerPicture: {
        width: '100%',
        height: 200,
        marginTop: 35,
    },
    companyName: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
    },
    location: {
        textAlign: 'center',
        color: '#666',
    },
    offerTitle: {
        textAlign: 'center',
        fontSize: 25,
        marginTop: 10,
        fontWeight: 'bold',
    },
    moreDetails: {
        marginTop: 20,
    },
    posted: {
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
    },
    skillTag: {
        backgroundColor: '#FFFFFF',
        borderColor: '#0047D2',
        borderWidth: 1,
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginRight: 10,
        marginBottom: 10,
    },
    skillText: {
        color: '#0047D2',
    },
    applyButton: {
        backgroundColor: '#0047D2',
        borderRadius: 20,
        paddingVertical: 15,
        position: 'absolute',
        bottom: 10,
        left: 20,
        right: 20,
    },
    applyButtonContainer: {
        backgroundColor: 'white',
        width: '100%',
        position: 'absolute',
        height: 70,
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10
    },
    applyButtonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    offerDetailsData: {
        marginTop: 5,
        marginLeft: 20,
        marginBottom: 10,
        flexDirection: 'column',
    },
    description: {
        marginTop: 5,
        marginLeft: 20,
        marginBottom: 10,
    },
});

export default OfferdetailsPage;