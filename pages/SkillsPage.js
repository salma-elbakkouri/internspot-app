import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity , TextInput} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, addDoc, where, query, getDocs, getDoc, doc, updateDoc, setDoc } from 'firebase/firestore/lite'; // Import where, query, getDocs, doc, updateDoc, setDoc
import { db } from '../config/firebase';

export default function SkillsPage({route}) {
    const userID = route.params?.userID;
    const [selectedSkills, setSelectedSkills] = useState([]);

    const skills = [
        'Python', 'Node.js', 'JavaScript', 'PostgreSQL', 'GitHub', 'Firebase', 'Agile', 'Scrum', 'Figma', 'Java', 'UX design', 'UI design', 'Android Dev', 'Power BI tool', 'Django', 'Mongo db',
    ];

    const toggleSkillSelection = (skill) => {
        if (selectedSkills.includes(skill)) {
            setSelectedSkills(selectedSkills.filter(selectedSkill => selectedSkill !== skill));
        } else {
            setSelectedSkills([...selectedSkills, skill]);
        }
    };


    const navigation = useNavigation();

    const navigateToExperiencePage = () => {
        navigation.navigate('ExperiencePage', {userID});
    };

    const navigateToProfilecreatedPage = async () => {
        const userDocRef = doc(db, 'users', userID);
    
        try {
            const userDocSnapshot = await getDoc(userDocRef);
            
            // Check if user document exists
            if (userDocSnapshot.exists()) {
                await updateDoc(userDocRef, {
                    skills: selectedSkills,
                });
            } else {
                console.error("User document does not exist!");
            }
        } catch (error) {
            console.error("Error fetching user document:", error);
        }

        navigation.navigate('ProfilecreatedPage', {userID});
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>What is your skill?</Text>
            <TextInput
                style={styles.input}
                placeholder="Search"
                placeholderTextColor="lightgray"
            />
            <View style={styles.skillsContainer}>
                {skills.map((skill, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.skillButton,
                            {
                                backgroundColor: selectedSkills.includes(skill) ? '#186ade' : '#dce3e8',
                            },
                        ]}
                        onPress={() => toggleSkillSelection(skill)}
                    >
                        <Text style={[styles.skillButtonText, { color: selectedSkills.includes(skill) ? 'white' : '#3e5463' }]}>
                            {skill}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.navigationButtonsContainer}>
                <TouchableOpacity style={[styles.navigationButton, { backgroundColor: '#0047D2' }]} onPress={navigateToProfilecreatedPage}>
                    <Text style={styles.navigationButtonText}>Finish</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.navigationButton, { backgroundColor: '#E8F0FF' }]} onPress={navigateToExperiencePage}>
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
        marginBottom:20,
    },
    input: {
        width: '100%',
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 20,
        elevation: 2,
    },
    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
    },
    skillButton: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        margin: 5,
        borderRadius: 20,
    },
    skillButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    navigationButtonsContainer: {
        flexDirection: 'column',
        marginTop: 'auto',
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
