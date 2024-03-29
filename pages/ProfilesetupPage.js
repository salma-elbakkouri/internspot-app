import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from '@react-navigation/native';

export default function ProfilesetupPage() {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState(new Date());

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (selectedDate) => {
        setDate(selectedDate);
        hideDatePicker();
    };

    const navigation = useNavigation();

    const navigateToEducationPage = () => {
        navigation.navigate('EducationPage'); //navigate to education page 
      };

      const navigateToHomePage = () => {
        navigation.navigate('Home'); //navigate to education page 
      };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Let's start creating your profile!</Text>

            <View style={styles.formContainer}>
                <Text style={styles.label}>First name</Text>
                <TextInput
                    style={styles.input}
                    placeholder=""
                />

                <Text style={styles.label}>Last name</Text>
                <TextInput
                    style={styles.input}
                    placeholder=""
                />

                <Text style={styles.label}>Email address</Text>
                <TextInput
                    style={styles.input}
                    placeholder=""
                />

                <Text style={styles.label}>Phone number</Text>
                <TextInput
                    style={styles.input}
                    placeholder=""
                />

                <Text style={styles.label}>Date of birth</Text>
                <View style={styles.datePickerContainer}>
                    <TouchableOpacity onPress={showDatePicker}>
                        <Text>{date.toDateString()}</Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
                </View>


                <Text style={styles.label}>State</Text>
                <TextInput
                    style={styles.input}
                    placeholder=""
                // dropdown functionality
                />
            </View>

            <TouchableOpacity style={styles.nextButton} onPress={navigateToEducationPage}>
                <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>

            <View style={styles.skipTextContainer}>
                <TouchableOpacity style={styles.skipTextButton} onPress={navigateToHomePage}>
                    <Text style={styles.skipText}>Skip to explore offers</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 80,
        marginBottom: 20,
    },
    formContainer: {
        width: '100%',
    },
    label: {
        fontSize: 16,
        color: '#000',
        marginBottom: 5,
    },
    input: {
        width: '100%',
        height: 40,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    nextButton: {
        backgroundColor: '#0047D2',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 20,
        borderRadius: 30,
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    skipTextContainer: {
        alignItems: 'center',
        flex: 1,
    },
    skipTextButton: {
        marginTop: 10,
    },
    skipText: {
        color: '#0057FF',
        textDecorationLine: 'underline',
    },
    datePickerContainer: {
        paddingVertical: 10,
        width: '100%',
        height: 40,
        marginBottom: 15,
        borderWidth: 1, // for example
        borderColor: '#ccc', // for example
        paddingHorizontal: 10, // for example
        backgroundColor: '#fff', // for example
    }
});
