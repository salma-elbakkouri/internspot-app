import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const OfferdetailsPage = ({ route, navigation }) => {
    const { offer } = route.params;

    // Function to handle saving/un-saving offer
    const handleSaveOffer = () => {
        // Your logic for saving/un-saving offer goes here
    };

    return (
        <View style={styles.container}>
            {/* Back button */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <FontAwesome name="chevron-left" size={24} color="#0047D2" />
            </TouchableOpacity>

            {/* Save button */}
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveOffer}>
                <FontAwesome name="bookmark" size={24} color="#0047D2" />
            </TouchableOpacity>

            {/* Offer picture */}
            <Image source={offer.picture} style={styles.offerPicture} resizeMode="contain" />

            {/* Offer details */}
            <Text style={styles.companyName}>{offer.company}</Text>
            <Text style={styles.location}>{offer.location}</Text>
            <Text style={styles.offerTitle}>{offer.title}</Text>

            {/* More details */}
            <View style={styles.moreDetails}>
                <Text style={styles.posted}>Posted {offer.posted}</Text>
                <Text style={styles.sectionTitle}>Details</Text>
                <Text>{offer.details}</Text>
                <Text style={styles.sectionTitle}>Description</Text>
                <Text>{offer.description}</Text>
                <Text style={styles.sectionTitle}>Responsibilities</Text>
                <Text>{offer.responsibilities}</Text>
                <Text style={styles.sectionTitle}>Qualification</Text>
                <Text>{offer.qualification}</Text>
                <Text style={styles.sectionTitle}>Skills Required</Text>
                <View style={styles.skillsContainer}>
                    {offer.skills && offer.skills.map((skill, index) => (
                        <View key={index} style={styles.skillTag}>
                            <Text style={styles.skillText}>{skill}</Text>
                        </View>
                    ))}
                </View>

            </View>

            {/* Apply button */}
            <TouchableOpacity style={styles.applyButton}>
                <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
    },
    saveButton: {
        position: 'absolute',
        top: 50,
        right: 20,
    },
    offerPicture: {
        width: '100%',
        height: 200,
        marginTop: 20,
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
        fontSize: 18,
        marginTop: 10,
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
        marginTop: 20,
    },
    applyButtonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default OfferdetailsPage;
