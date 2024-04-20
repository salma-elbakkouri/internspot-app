import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform , ScrollView , Alert} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, addDoc, where, query, getDocs, doc, updateDoc, setDoc } from 'firebase/firestore/lite'; // Import where, query, getDocs, doc, updateDoc, setDoc
import { db } from '../config/firebase';

export default function ProfilesetupPage({ route }) {
    const user = route.params?.user;
    const completProfile = route.params?.completProfile;


    const [firstName, setFirstName] = useState(completProfile ? user.firstName : '');
    const [lastName, setLastName] = useState(completProfile ? user.lastName : '');
    const [phoneNumber, setPhoneNumber] = useState(completProfile ? user.phoneNumber : '');
    const [state, setState] = useState(completProfile ? user.state : '');
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState();

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (selectedDate) => {
        setDateOfBirth(selectedDate);
        hideDatePicker();
    };

    const navigation = useNavigation();

    const navigateToEducationPage = async () => {

        if (!firstName || !lastName || !phoneNumber || !dateOfBirth || !state) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }

        const q = query(collection(db, 'users'), where('email', '==', user.email));
        const querySnapshot = await getDocs(q);
        const userData = [];
        querySnapshot.forEach((doc) => {
            userData.push({ id: doc.id, ...doc.data() });
        });
    
        if (userData.length > 0) {
            const userDocRef = doc(db, 'users', userData[0].id);
            const newData = {
                firstName,
                lastName,
                email: user.email,
                phoneNumber,
                dateOfBirth,
                state,
            };
            await updateDoc(userDocRef, newData);
            navigation.navigate('EducationPage', {userID: userData[0].id});
        } else {
            console.log("No user data found for email:", user.email);
            // Handle case where no user data is found
        }
    };    

    const navigateToHomePage = () => {
        navigation.navigate('Home', {skiped: false}); //navigate to education page 
    };

    return (
        <ScrollView style={styles.scrollViewStyle}>
        <View style={styles.container}>
            <Text style={styles.title}>Let's start creating your profile!</Text>

            <View style={styles.formContainer}>
                <Text style={styles.label}>First name</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setFirstName}
                    value={firstName}
                />

                <Text style={styles.label}>Last name</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setLastName}
                    value={lastName}
                />

                <Text style={styles.label}>Email address</Text>
                <TextInput
                    style={styles.input}
                    value={user.email}
                    editable={false}
                />

                <Text style={styles.label}>Phone number</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setPhoneNumber}
                    keyboardType="phone-pad"
                    required
                    value={phoneNumber}
                />
                

                <Text style={styles.label}>Date of birth</Text>
                <View style={styles.datePickerContainer}>
                    <TouchableOpacity onPress={showDatePicker}>
                        <Text>{dateOfBirth.toDateString()}</Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                        date={dateOfBirth}
                    />
                </View>


                <Text style={styles.label}>City</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setState}
                    value={state}
                    required
                // dropdown functionality
                />
            </View>

            <TouchableOpacity style={styles.nextButton} onPress={navigateToEducationPage}>
                <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>

        {
            !completProfile ? (
                <View style={styles.skipTextContainer}>
                    <TouchableOpacity style={styles.skipTextButton} onPress={navigateToHomePage}>
                        <Text style={styles.skipText}>Skip to explore offers</Text>
                    </TouchableOpacity>
                </View>
            ) : null
        }
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
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 20,
        marginTop:60,
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
        marginTop: '30',
        marginBottom:20,
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
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    }
});
