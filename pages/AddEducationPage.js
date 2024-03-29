import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from '@react-navigation/native';

export default function AddEducationPage() {
    const [school, setSchool] = useState('');
    const [degree, setDegree] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [description, setDescription] = useState('');
    const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

    const showStartDatePicker = () => {
        setStartDatePickerVisibility(true);
    };

    const hideStartDatePicker = () => {
        setStartDatePickerVisibility(false);
    };

    const handleStartDateConfirm = (selectedDate) => {
        setStartDate(selectedDate.toDateString());
        hideStartDatePicker();
    };

    const showEndDatePicker = () => {
        setEndDatePickerVisibility(true);
    };

    const hideEndDatePicker = () => {
        setEndDatePickerVisibility(false);
    };

    const handleEndDateConfirm = (selectedDate) => {
        setEndDate(selectedDate.toDateString());
        hideEndDatePicker();
    };

    const navigation = useNavigation();

    const handleCancel = () => {
        navigation.goBack();
    };

    const handleSubmit = () => {
        navigation.goBack();
        // Handle submission logic here
    };

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.label}>School</Text>
                <TextInput
                    style={styles.input}
                    placeholder="EX : MOHAMMED V UNIVERSITY"
                    value={school}
                    onChangeText={setSchool}
                />

                <Text style={styles.label}>Degree</Text>
                <TextInput
                    style={styles.input}
                    placeholder="EX : Master Degree"
                    value={degree}
                    onChangeText={setDegree}
                />

                <Text style={styles.label}>Specialization</Text>
                <TextInput
                    style={styles.input}
                    placeholder="EX : Cloud Computing"
                    value={specialization}
                    onChangeText={setSpecialization}
                />

                <View style={styles.datePickerContainer}>
                    <Text style={styles.label}>Start Date</Text>
                    <TouchableOpacity onPress={showStartDatePicker}>
                        <Text style={styles.dateText}>{startDate || 'Select start date'}</Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={isStartDatePickerVisible}
                        mode="date"
                        onConfirm={handleStartDateConfirm}
                        onCancel={hideStartDatePicker}
                    />
                </View>

                <View style={styles.datePickerContainer}>
                    <Text style={[styles.label, { marginBottom: 5 }]}>End Date</Text>
                    <TouchableOpacity onPress={showEndDatePicker}>
                        <Text style={styles.dateText}>{endDate || 'Select end date'}</Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={isEndDatePickerVisible}
                        mode="date"
                        onConfirm={handleEndDateConfirm}
                        onCancel={hideEndDatePicker}
                    />
                </View>

                <Text style={styles.label}>Description</Text>
                <TextInput
                    style={[styles.input, { height: 100 }]}
                    multiline
                    value={description}
                    onChangeText={setDescription}
                />

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, { backgroundColor: '#e8f0ff' }]} onPress={handleCancel}>
                        <Text style={[styles.buttonText, { color: "#0047D2" }]}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, { backgroundColor: '#0047D2' }]} onPress={handleSubmit}>
                        <Text style={[styles.buttonText, { color: 'white' }]}>Save</Text>
                    </TouchableOpacity>
                </View>
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
    form: {
        marginTop: 60,
    },
    label: {
        fontSize: 16,
        color: 'black',
        marginBottom: 5,
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    datePickerContainer: {
        marginBottom: 15,
    },
    dateText: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
        textAlignVertical: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        borderRadius: 30,
        paddingVertical: 10,
        marginHorizontal: 5,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
