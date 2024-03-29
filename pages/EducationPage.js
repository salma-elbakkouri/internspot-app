import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function EducationPage() {
    const educations = [
        {
            title: 'Ingenierie des Applications Mobiles',
            type: 'License Professionnelle',
            school: 'Ecole Superieure de Technologie de Salé',
            duration: 'Oct 2023 - July 2024',
        },
        {
            title: 'Genie Informatique',
            type: 'Diplome Universitaire de Technologie',
            school: 'Ecole Superieure de Technologie de Fes',
            duration: 'Oct 2020 - July 2022',
        },
    ];

    const navigation = useNavigation();

    const navigateToAddEducationPage = () => {
        navigation.navigate('AddEducationPage'); //navigate to sign-up page 
      };
    

    return (
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
                        <Text style={styles.educationTitle}>{item.title}</Text>
                        <Text>{item.type}</Text>
                        <Text>{item.school}</Text>
                        <Text>{item.duration}</Text>
                    </View>
                )}
            />
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
        marginTop:50,
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
        fontSize:15,
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
});
