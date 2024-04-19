import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList , ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, addDoc, where, query, getDocs, getDoc, doc, updateDoc, setDoc } from 'firebase/firestore/lite'; // Import where, query, getDocs, doc, updateDoc, setDoc
import { db } from '../config/firebase';

export default function EducationPage({ route }) {
    const userID = route.params?.userID;
    const addedNewEducation = route.params?.addedNewEducation;
    const [educations, setEducations] = useState([]);

    const fetchEducations = async () => {
        const userDocRef = doc(db, 'users', userID);
    
        try {
            const userDocSnapshot = await getDoc(userDocRef);
            
            // Check if user document exists
            if (userDocSnapshot.exists()) {
                const userData = userDocSnapshot.data();
                const educationsList = userData.educations || []; // Initialize educations array if it doesn't exist
                setEducations(educationsList);
            } else {
                console.error("User document does not exist!");
                setEducations([]);
            }
        } catch (error) {
            console.error("Error fetching user document:", error);
            setEducations([]);
        }
    };

    useEffect(() => {
        fetchEducations();
    }, []);

    if (addedNewEducation) {
        fetchEducations();
    }

    const navigation = useNavigation();

    const navigateToAddEducationPage = () => {
        navigation.navigate('AddEducationPage', { userID });
    };

    const navigateToProfileSetupPage = () => {
        navigation.goBack();
    };

    const navigateToExperiencePage = () => {
        navigation.navigate('ExperiencePage', { userID });
    };

    const formatDateRange = (startDateStr, endDateStr) => {
        const startDate = new Date(startDateStr);
        const endDate = new Date(endDateStr);
    
        // Get the month and year for the start date
        const startMonthYear = startDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    
        // Get the month and year for the end date
        const endMonthYear = endDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    
        return `${startMonthYear} - ${endMonthYear}`;
    };

    return (
        <ScrollView style={styles.scrollViewStyle}>
        <View style={styles.container}>
            <Text style={styles.title}>Education</Text>
            <TouchableOpacity style={styles.addButton} onPress={navigateToAddEducationPage}>
                <Text style={styles.addButtonLabel}>+ Add Education</Text>
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>My educations</Text>
            <FlatList
                data={educations}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.educationContainer}>
                        <Text style={styles.educationTitle}>{item.specialization}</Text>
                        <Text>{item.degree}</Text>
                        <Text>{item.school}</Text>
                        <Text>{formatDateRange(item.start_date, item.end_date)}</Text>
                    </View>
                )}
            />

            <View style={styles.navigationButtonsContainer}>
                <TouchableOpacity style={[styles.navigationButton, { backgroundColor: '#0047D2' }]} onPress={navigateToExperiencePage}>
                    <Text style={styles.navigationButtonText}>Next</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.navigationButton, { backgroundColor: '#E8F0FF' }]} onPress={navigateToProfileSetupPage}>
                    <Text style={[styles.navigationButtonText, { color: '#0047D2' }]}>Back</Text>
                </TouchableOpacity>
            </View>
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollViewStyle: {
        flex: 1,
        backgroundColor: 'white',  // Match the background color for consistency
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 50,
    },
    addButton: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#0047D2',
        borderRadius: 20,
        padding: 10,
        marginTop: 10,
    },
    addButtonLabel: {
        color: '#0047D2',
        textAlign: 'center',
        fontSize: 15,
    },
    sectionTitle: {
        fontSize: 16,
        marginTop: 20,
        marginBottom: 10,
    },
    educationContainer: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    educationTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    navigationButtonsContainer: {
        flexDirection: 'column',
        marginTop: 20,
        alignItems: 'center',
    },
    navigationButton: {
        backgroundColor: '#0047D2',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 10,
        width:'100%',
    },
    navigationButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
});
