import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, addDoc, where, query, getDocs, getDoc, doc, updateDoc, setDoc } from 'firebase/firestore/lite'; // Import where, query, getDocs, doc, updateDoc, setDoc
import { db } from '../config/firebase';

export default function ExperiencePage({route}) {
    const userID = route.params?.userID;
    const [experiences, setExperiences] = useState([]);

    useEffect(() => {
        const fetchExperiences = async () => {
            const userDocRef = doc(db, 'users', userID);
        
            try {
                const userDocSnapshot = await getDoc(userDocRef);
                
                // Check if user document exists
                if (userDocSnapshot.exists()) {
                    const userData = userDocSnapshot.data();
                    const experiencesList = userData.experiences || []; // Initialize experiences array if it doesn't exist
                    setExperiences(experiencesList);
                } else {
                    console.error("User document does not exist!");
                    setExperiences([]);
                }
            } catch (error) {
                console.error("Error fetching user document:", error);
                setExperiences([]);
            }
        };

        fetchExperiences();
    }, []);

    const navigation = useNavigation();

    const navigateToAddExperiencePage = () => {
        navigation.navigate('AddExperiencePage', {userID});
    };

    const navigateToEducationPage = () => {
        navigation.navigate('EducationPage', {userID});
    };

    const navigateToSkillsPage = () => {
        navigation.navigate('SkillsPage', {userID});
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
        <View style={styles.container}>
            <Text style={styles.title}>Experience</Text>

            <TouchableOpacity style={styles.addButton} onPress={navigateToAddExperiencePage}>
                <Text style={styles.addButtonLabel}>+ Add Experience</Text>
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>My experience</Text>
            <FlatList
                data={experiences}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.experienceContainer}>
                        <Text style={styles.experienceTitle}>{item.post_title}</Text>
                        <Text>{item.company}</Text>
                        <Text>{item.location}</Text>
                        <Text>{formatDateRange(item.start_date, item.end_date)}</Text>
                    </View>
                )}
            />

            <View style={styles.navigationButtonsContainer}>
                <TouchableOpacity style={[styles.navigationButton, { backgroundColor: '#0047D2' }]} onPress={navigateToSkillsPage}>
                    <Text style={styles.navigationButtonText}>Next</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.navigationButton, { backgroundColor: '#E8F0FF' }]} onPress={navigateToEducationPage}>
                    <Text style={[styles.navigationButtonText, { color: '#0047D2' }]}>Back</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
    sectionTitle: {
        fontSize: 16,
        marginTop: 20,
        marginBottom: 10,
    },
    experienceContainer: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    experienceTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    navigationButtonsContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    navigationButton: {
        backgroundColor: '#0047D2',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 10,
        width: '100%',
    },
    navigationButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
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
});
