import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, addDoc, where, query, getDocs, getDoc, doc, updateDoc, setDoc } from 'firebase/firestore/lite'; // Import where, query, getDocs, doc, updateDoc, setDoc
import { db } from '../config/firebase';

export default function SkillsPage({ route }) {
    const navigation = useNavigation();
    const userID = route.params?.userID;
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [skills, setSkills] = useState([]);
    const [defaultSkills, setDefaultSkills] = useState([]);

    const fetchSkills = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'skills'));
            const skillsData = [];
            querySnapshot.forEach((doc) => {
                skillsData.push(doc.data().name);
            });
            setSkills(skillsData);
            setDefaultSkills(skillsData);
        } catch (error) {
            console.error("Error fetching skills:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchSkills();
    }, [])

    const toggleSkillSelection = (skill) => {
        if (selectedSkills.includes(skill)) {
            setSelectedSkills(selectedSkills.filter(selectedSkill => selectedSkill !== skill));
        } else {
            setSelectedSkills([...selectedSkills, skill]);
        }
    };

    const navigateToExperiencePage = () => {
        navigation.navigate('ExperiencePage', { userID });
    };

    const navigateToProfilecreatedPage = async () => {
        const userDocRef = doc(db, 'users', userID);

        try {
            const userDocSnapshot = await getDoc(userDocRef);
            defaultSkills.forEach(async (skill) => {
                if (!skills.includes(skill)) {
                    await storeNewSkill(skill);
                }
            });

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

        navigation.navigate('ProfilecreatedPage', { userID });
    };

    const storeNewSkill = async (skill) => {
        const skillsCollectionRef = collection(db, 'skills');
        await addDoc(skillsCollectionRef, {
            name: skill,
        });
    };

    const addNewSkill = async (text) => {
        if (text !== '') {
            const querySnapshot = await getDocs(collection(db, 'skills'));
            const skillsData = [];
            querySnapshot.forEach((doc) => {
                skillsData.push(doc.data().name);
            });
            const filteredSkills = skillsData.filter((skill) => skill.toLowerCase().includes(text.toLowerCase()));
            setSkills([text, ...filteredSkills]);
        }else{
            const addedSkills = [];
            selectedSkills.forEach((skill) => {
                if (!skills.includes(skill)) {
                    addedSkills.push(skill);
                }
            });

            setSkills([...addedSkills, ...skills]);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>What is your skill?</Text>
            <TextInput
                onChangeText={(text) => addNewSkill(text)}
                style={styles.input}
                placeholder="Search"
                placeholderTextColor="lightgray"
            />
            {loading ? (
                <ActivityIndicator size="large" color="#0047D2" style={[styles.loadingSpin]} />
            ) : (
                <ScrollView contentContainerStyle={styles.skillsContainer}>
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
                </ScrollView>
            )}
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
        marginBottom: 20,
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
        width: '100%',
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
        backgroundColor: 'white',
        paddingTop: 10,
        flexDirection: 'column',
        marginTop: 'auto',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        width: 'auto',
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
    loadingSpin: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
