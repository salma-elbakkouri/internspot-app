import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, BackHandler, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function ApplicationdetailPage({ route, navigation }) {
    // Extract application data from route params
    const { application } = route.params;

    // Function to handle navigation back
    const handleBack = () => {
        navigation.goBack();
    };

    // Function to navigate to MessageReceiverPage
    const handleMessagePress = () => {
        if (application.status === 'Application Accepted') {
            navigation.navigate('MessagereceiverPage');
        }
        else if (application.status == 'Application Rejected') {
            navigation.navigate('Home');
        }
    };

    return (
        <View style={styles.container}>
            {/* Back button */}
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                <FontAwesome name="arrow-left" size={24} color="black" />
            </TouchableOpacity>
            {/* Application photo */}
            <Image source={require('../assets/amazon.jpg')} style={styles.applicationPhoto} />
            {/* Company name */}
            <Text style={styles.companyName}>{application.company}</Text>
            {/* Location */}
            <Text style={styles.location}>Offer Location</Text>
            {/* Offer title */}
            <Text style={styles.offerTitle}>{application.title}</Text>
            {/* Tags for full time and remote */}
            <View style={styles.tagsContainer}>
                <View style={[styles.typetag, { borderColor: '#0047D2' }]}>
                    <Text style={[styles.typetagText, { color: '#0047D2' }]}>Full Time</Text>
                </View>
                <View style={[styles.typetag, { borderColor: '#0047D2' }]}>
                    <Text style={[styles.typetagText, { color: '#0047D2' }]}>Remote</Text>
                </View>
            </View>
            {/* Divider */}
            <View style={styles.divider} />
            {/* Application status */}
            <View style={styles.applicationLastContainer}>
                <Text style={styles.applicationStatus}>Your Application Status</Text>
                <View style={[styles.tag, getStatusStyle(application.status)]}>
                    <Text style={[styles.tagText, getStatustextStyle(application.status)]}>{application.status}</Text>
                </View>
            </View>
            {/* Button */}
            <TouchableOpacity style={styles.button} onPress={handleMessagePress}>
                <Text style={styles.buttonText}>
                    {application.status === 'Application Accepted' ? 'Send Message to Receiver' :
                        application.status === 'Application Sent' ? 'Waiting...' :
                            'Discover Another Offer'}
                </Text>
            </TouchableOpacity>

        </View>
    );
}

// Function to get style based on application status
const getStatustextStyle = (status) => {
    switch (status) {
        case 'Application Sent':
            return {
                color: '#0047D2',
                // Text color for Application Sent
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
};

// Function to get style based on application status
const getStatusStyle = (status) => {
    switch (status) {
        case 'Application Sent':
            return {
                backgroundColor: '#e8f0ff',
                padding: 5,
                borderRadius: 10,
                marginBottom: 10
            };
        case 'Application Accepted':
            return {
                backgroundColor: '#d2ffdc',
                padding: 5,
                borderRadius: 10,
                marginBottom: 10
            };
        case 'Application Rejected':
            return {
                backgroundColor: '#ffd9d9',
                padding: 5,
                borderRadius: 10,
                marginBottom: 10
            };
        default:
            return {};
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,

    },
    backButton: {
        position: 'absolute',
        top: 60,
        left: 20,
        zIndex: 1,
    },
    applicationPhoto: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center',
        marginBottom: 10,
        marginTop: 70,
    },
    companyName: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
    },
    location: {
        textAlign: 'center',
        color: '#4A4A4A',
        marginBottom: 5,
    },
    offerTitle: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    tagsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    typetag: {
        borderWidth: 1,
        borderRadius: 30,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginRight: 10,
    },
    typetagText: {
        fontSize: 12,
    },
    tag: {
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginRight: 10,
    },
    tagText: {
        padding: 2,
        textAlign: 'center',
        fontSize: 12,
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        marginBottom: 20,
    },
    applicationLastContainer:
    {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    applicationStatus: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#0047D2',
        padding: 15,
        borderRadius: 35,
        marginTop: 'auto',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
});
