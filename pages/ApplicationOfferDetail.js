import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

function ApplicationOfferDetail({navigation, route}) {
    const offerData = route.params.offer;
    const [offer, setOffer] = useState(offerData);

    const handleGoBack = () => {
        navigation.goBack();
    };
    
    const postedDate = new Date(offer.general_info.Posted_Date);
    const currentDate = new Date();

    const timeDifference = currentDate - postedDate;

    const secondsDifference = Math.floor(timeDifference / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = Math.floor(minutesDifference / 60);
    const daysDifference = Math.floor(hoursDifference / 24);

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
            {/* <TouchableOpacity style={styles.saveButton} onPress={handleSaveOffer}>
                <FontAwesome name="bookmark" size={24} color="lightgray" />
            </TouchableOpacity> */}

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Offer picture */}
                <Image
                    source={require('../assets/offerimg.jpg')}
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
        </View>
    );
}

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
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
    },
    location: {
        fontSize:14,
        textAlign: 'center',
        color: '#666',
    },
    offerTitle: {
        textAlign: 'center',
        fontSize: 20,
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
        borderRadius: 30,
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
    appliedBlock: {
        padding: 20,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    appliedBlockTitle: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    appliedBlockButtons: {
        flexDirection: 'row',
        marginTop: 10,
    },
    appliedBlockBtnText: {
        fontSize: 16,
        color: '#0047D2',
        fontWeight: 'bold',
    },
    appliedBlockBtn: {
        marginHorizontal: 5,
    },
});

export default ApplicationOfferDetail