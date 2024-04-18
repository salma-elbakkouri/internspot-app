import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image, Alert, TextInput, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import BottomTabBar from '../components/BottomTabBar';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, collection, addDoc, where, query, getDocs, getDoc, doc, updateDoc, setDoc } from 'firebase/firestore/lite';
import { db } from '../config/firebase';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function EditProfilePage({ navigation, route }) {
    const navigation1 = useNavigation();
    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState(null);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [selectedImage, setSelectedImage] = useState(require('../assets/profilepic.png'));
    const reload = route.params?.reload;
    const [profilePicUpdated, setProfilePicUpdated] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [state, setState] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [email, setEmail] = useState('');
    const [userSkills, setUserSkills] = useState([]);
    const [educations, setEducations] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [profilePic, setProfilePic] = useState(null);

    const handelSave = async () => {
        if (firstName === "" || lastName === "" || phoneNumber === "" || email === "" || state === "") {
            Alert.alert(
                'Fields required',
                'Be sure there is any field empty!',
                [
                    {
                        text: 'ok',
                        style: 'cancel',
                    },
                ]);
        } else {
            try {
                const usersCollection = collection(db, 'users');
                const userQuery = query(usersCollection, where('email', '==', email));

                const querySnapshot = await getDocs(userQuery);
                const userDoc = querySnapshot.docs[0];

                if (!userDoc) {
                    console.error('User not found.');
                    return;
                }

                const userRef = doc(usersCollection, userDoc.id);

                if (profilePicUpdated) {
                    // Convert the selected image URI to a blob
                    const response = await fetch(selectedImage.uri);
                    const blob = await response.blob();

                    // Upload the image blob to Firebase Storage
                    const storage = getStorage();
                    const storageRef = ref(storage, `profileImages/${email}`);
                    await uploadBytes(storageRef, blob);

                    // Get the download URL of the uploaded image
                    const imageUrl = await getDownloadURL(storageRef);

                    // Update Firestore document with user data including the image URL
                    await updateDoc(userRef, {
                        firstName: firstName,
                        lastName: lastName,
                        phoneNumber: phoneNumber,
                        state: state,
                        profileImageUrl: imageUrl // Add the image URL to the user document
                    });
                }else{
                    await updateDoc(userRef, {
                        firstName: firstName,
                        lastName: lastName,
                        phoneNumber: phoneNumber,
                        state: state,
                    });
                }



                navigation1.navigate('Profile', { reload: true });
            } catch (error) {
                console.error('Error updating data: ', error);
                Alert.alert('Error', 'Failed to update data. Please try again later.');
            }
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const q = query(collection(db, 'users'), where('email', '==', user.email));
                const querySnapshot = await getDocs(q);
                const userDocSnapshot = querySnapshot.docs[0];
                setUserId(userDocSnapshot.id);
                setUser(userDocSnapshot.data());
                setIsUserLoggedIn(true);
            } else {
                setIsUserLoggedIn(false);
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (user) {
            setFirstName(user.firstName || '');
            setLastName(user.lastName || '');
            setPhoneNumber(user.phoneNumber || '');
            setState(user.state || '');
            setEmail(user.email || '');
            setUserSkills(user.skills || []);
            setEducations(user.educations || []);
            setExperiences(user.experiences || []);
            setProfilePic(user.profileImageUrl || '');
        }
    }, [user]);

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

    const fetchUserData = async () => {
        try {
            if (!user || !user.email) {
                console.log('User object or email is null');
                return;
            }
    
            const q = query(collection(db, 'users'), where('email', '==', user.email));
            const querySnapshot = await getDocs(q);
            const userDocSnapshot = querySnapshot.docs[0];
            
            if (userDocSnapshot) {
                setUserId(userDocSnapshot.id);
                setUser(userDocSnapshot.data());
            } else {
                console.error('User document not found');
            }
        } catch (error) {
            console.error('Error fetching user data: ', error);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchUserData();
        });

        return unsubscribe;
    }, [navigation]);

    const pickImage = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync();

        if (!result.cancelled) {
            const uri = result.assets[0].uri;
            setSelectedImage({ uri: uri });
            setProfilePicUpdated(true);
        }
    };

    const handleRemoveEducation = async (index) => {
        try {
            const updatedEducations = [...educations];
            updatedEducations.splice(index, 1);
            setEducations(updatedEducations);

            const usersCollection = collection(db, 'users');
            const userQuery = query(usersCollection, where('email', '==', email));

            const querySnapshot = await getDocs(userQuery);
            const userDoc = querySnapshot.docs[0];

            const userRef = doc(usersCollection, userDoc.id);

            await updateDoc(userRef, {
                educations: updatedEducations,
            });

            Alert.alert('Success', 'Education deleted Successfuly.');
        } catch (error) {
            console.error('Error deleting education: ', error);
            Alert.alert('Error', 'Failed to delete education. Please try again later.');
        }
    };

    const handleRemoveExperience = async (index) => {
        try {
            const updatedExperiences = [...experiences];
            updatedExperiences.splice(index, 1);
            setExperiences(updatedExperiences);

            const usersCollection = collection(db, 'users');
            const userQuery = query(usersCollection, where('email', '==', email));

            const querySnapshot = await getDocs(userQuery);
            const userDoc = querySnapshot.docs[0];

            const userRef = doc(usersCollection, userDoc.id);

            await updateDoc(userRef, {
                experiences: updatedExperiences,
            });

            Alert.alert('Success', 'Experience deleted Successfuly.');
        } catch (error) {
            console.error('Error deleting education: ', error);
            Alert.alert('Error', 'Failed to delete Experience. Please try again later.');
        }
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
            {/* Profile Details */}
            <ImageBackground source={require('../assets/bgimage.png')} style={styles.profileDetails}>
                <TouchableOpacity style={styles.backButton} onPress={() => {
                    navigation.goBack();
                }}>
                    <FontAwesome name="chevron-left" size={24} color="#fff" />
                </TouchableOpacity>

                <TouchableOpacity onPress={pickImage}>
                    <View style={styles.profileImageContainer}>
                        <Image
                            source={profilePic ? { uri: user.profileImageUrl } : require('../assets/img-placeholder.png')}
                            style={styles.profileImage}
                        />
                    </View>
                </TouchableOpacity>

                {/* Save button */}
                <TouchableOpacity style={styles.saveButton} onPress={handelSave}>
                    <Text style={styles.editProfileButtonText}>Save</Text>
                </TouchableOpacity>
            </ImageBackground>
            <ScrollView style={styles.formContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    editable={false}
                    textContentType='emailAddress'
                    style={styles.input}
                    value={email}
                />

                <Text style={styles.label}>First name</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setFirstName}
                    value={firstName}
                    textContentType='name'
                />

                <Text style={styles.label}>Last name</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setLastName}
                    value={lastName}
                    textContentType='name'
                />

                <Text style={styles.label}>State</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setState}
                    value={state}
                    textContentType='name'
                />

                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setPhoneNumber}
                    value={phoneNumber}
                    textContentType='telephoneNumber'
                    keyboardType='phone-pad'
                />

                <View style={styles.educationBlock}>
                    <View style={styles.educationBlockHeader}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Ionicons name="school-outline" size={24} color="#0047D2" />
                            <Text style={styles.educationBlockTitle}>Education</Text>
                        </View>
                        <TouchableOpacity style={styles.addButton} onPress={() => {
                            navigation1.navigate('AddEducationPage', { profileRedirect: true, userID: userId });
                        }}>
                            <Ionicons name="add" size={24} color="#0047D2" />
                        </TouchableOpacity>
                    </View>
                    {educations ? educations.map((education, index) => {
                        return (
                            <View key={index} style={styles.educationItemBlock}>
                                <View style={styles.educationItem}>
                                    <Text style={styles.CardEducationTitle}>{education.specialization}</Text>
                                    <Text style={styles.CardText}>{education.degree}, {education.school}</Text>
                                    <Text style={styles.CardText}>{formatDateRange(education.start_date, education.end_date)}</Text>
                                </View>
                                {/* <TouchableOpacity style={styles.editButton} onPress={() => { }}>
                                    <FontAwesome5 name="pen" size={14} color="#0047D2" />
                                </TouchableOpacity> */}
                                <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveEducation(index)}>
                                    <Ionicons name="trash-bin-outline" size={20} color="#FF2F2F" />
                                </TouchableOpacity>
                            </View>
                        );
                    }) :
                        <Text style={{ color: 'gray' }}>No education added</Text>
                    }

                </View>

                <View style={styles.educationBlock}>
                    <View style={styles.educationBlockHeader}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Ionicons name="briefcase-outline" size={24} color="#0047D2" />
                            <Text style={styles.educationBlockTitle}>Experience</Text>
                        </View>
                        <TouchableOpacity style={styles.addButton} onPress={() => {
                            navigation1.navigate('AddExperiencePage', { profileRedirect: true, userID: userId });
                        }}>
                            <Ionicons name="add" size={24} color="#0047D2" />
                        </TouchableOpacity>
                    </View>
                    {experiences ? experiences.map((experience, index) => {
                        return (
                            <View key={index} style={styles.educationItemBlock}>
                                <View style={styles.educationItem}>
                                    <Text style={styles.CardEducationTitle}>{experience.post_title}</Text>
                                    <Text style={styles.CardText}>{experience.company}, {experience.location}</Text>
                                    <Text style={styles.CardText}>{formatDateRange(experience.start_date, experience.end_date)}</Text>
                                </View>
                                {/* <TouchableOpacity style={styles.editButton} onPress={() => {
                                    navigation1.navigate('AddExperiencePage', { profileRedirect: true, userID: userId, experience: experience, index: index });
                                }}>
                                    <FontAwesome5 name="pen" size={14} color="#0047D2" />
                                </TouchableOpacity> */}
                                <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveExperience(index)}>
                                    <Ionicons name="trash-bin-outline" size={20} color="#FF2F2F" />
                                </TouchableOpacity>
                            </View>
                        );
                    }) :
                        <Text style={{ color: 'gray' }}>No experience added</Text>
                    }
                </View>

                <View style={styles.skillsBock}>
                    <View style={styles.educationBlockHeader}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Ionicons name="flash-outline" size={24} color="#0047D2" />
                            <Text style={styles.educationBlockTitle}>Skills</Text>
                        </View>
                        <TouchableOpacity style={styles.addButton} onPress={() => {
                            navigation1.navigate('SkillsPage', { profileRedirect: true, userID: userId, userSkills: userSkills });
                        }}>
                            <Ionicons name="add" size={24} color="#0047D2" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {userSkills ? userSkills.map((skill, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.skillButton
                                ]}
                            >
                                <Text style={[styles.skillButtonText, { color: 'white' }]}>
                                    {skill}
                                </Text>
                            </TouchableOpacity>
                        )) :
                            <Text style={{ color: 'gray' }}>No skills added</Text>
                        }
                    </View>
                </View>
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    profileDetails: {
        alignItems: 'center',
        marginTop: 30,
        paddingVertical: 20,
    },
    profileImageContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        position: 'relative',
    },
    profileImage: {
        width: '100%',
        height: '100%',
    },
    profileEmail: {
        color: 'white',
        marginBottom: 5,
    },
    profileNumber: {
        color: 'white',
        marginBottom: 20,
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 999,
        height: 30,
        width: 30,
    },
    saveButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 999,
        height: 'auto',
        width: 'auto',
        padding: 5,
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        flexDirection: 'row',
        alignSelf: 'flex-end',
        borderRadius: 5,
    },
    editProfileButtonText: {
        color: 'white',
        fontSize: 13,
        marginRight: 5,
        fontWeight: 'bold',
    },
    formContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
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
    educationBlock: {
        padding: 16,
        marginBottom: 5,
        paddingTop: 5
    },
    addButton: {
        borderRadius: 50,
        backgroundColor: '#E8F0FF',
        padding: 5,
        height: '100%',
    },
    editButton: {
        borderRadius: 50,
        backgroundColor: '#E8F0FF',
        padding: 5,
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    removeButton: {
        borderRadius: 50,
        backgroundColor: '#FFC2C2',
        padding: 5,
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5,
    },
    educationBlockTitle: {
        fontSize: 16,
        fontWeight: 'semibold',
        marginLeft: 10,
    },
    educationBlockHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        paddingBottom: 10,
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#E8E8E8',
    },
    educationItem: {
        flexDirection: 'column',
        marginBottom: 6,
        width: '80%'
    },
    CardEducationTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    CardText: {
        fontSize: 14,
    },
    educationItemBlock: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    skillsBock: {
        width: 'auto',
        height: 'auto',
        padding: 16,
        marginBottom: 5,
        paddingTop: 5
    },
    skillButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    skillButton: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        margin: 5,
        borderRadius: 20,
        backgroundColor: '#0047D2',
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