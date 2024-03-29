import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ExperiencePage() {
    const experiences = [
        {
            title: 'Full Stack Developer',
            company: 'Digimind',
            location: 'Rabat - Salé',
            duration: 'Avril 2023 - July 2023',
        }
    ];

    const navigation = useNavigation();

    const navigateToAddExperiencePage = () => {
        navigation.navigate('AddExperiencePage');
    };

    const navigateToEducationPage = () => {
        navigation.navigate('EducationPage');
    };

    const navigateToSkillsPage = () => {
        navigation.navigate('SkillsPage');
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
                        <Text style={styles.experienceTitle}>{item.title}</Text>
                        <Text>{item.company}</Text>
                        <Text>{item.location}</Text>
                        <Text>{item.duration}</Text>
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
