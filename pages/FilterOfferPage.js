import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator, TextInput, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { getFirestore, collection, addDoc, where, query, getDocs, getDoc, doc, orderBy, setDoc, limit, startAt, endAt } from 'firebase/firestore/lite';
import { db } from '../config/firebase';



export default function FilterOffersPage({ navigation, route }) {
    const [suggestions, setSuggestions] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [defaultSuggestions, setDefaultSuggetions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState(suggest ? suggest.name : '');
    const suggest = route.params?.suggest;

    const handleBack = () => {
        navigation.goBack();
    };

    useEffect(() => {
        const fetchData = async () => {
            const q = query(collection(db, 'suggestions'), orderBy('count', 'desc'));
            const querySnapshot = await getDocs(q);
            const data = [];
            querySnapshot.forEach(doc => {
                const suggestion = {
                    id: doc.id,
                    ...doc.data()
                };
                data.push(suggestion);
            });
            setSuggestions(data);
            setDefaultSuggetions(data);
            setLoading(false);
        };
    
        fetchData();
    }, []);

    const navigateResultsPage = ({suggest}) => {
        navigation.navigate('FilterOffersResults', {suggest: suggest});
    }

    const fillerSuggestions = async (val) => {
        setSearchText(val);
        if (val.trim() !== "") {
            setLoading(true);
            console.log("Searching for: ", val);
            
            try {
                const querySnapshot = await getDocs(collection(db, 'suggestions'));
                const data = [];
                querySnapshot.forEach(doc => {
                    const suggestion = {
                        id: doc.id,
                        ...doc.data()
                    };
                    data.push(suggestion);
                });
    
                // Filter the suggestions based on the val
                const filteredData = data.filter(suggestion => {
                    return suggestion.name.toLowerCase().includes(val.trim().toLowerCase());
                });
    
                setSuggestions(filteredData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching suggestions:", error);
                setLoading(false);
            }
        } else {
            setSuggestions(defaultSuggestions);
        }
    };    

    const suggetItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigateResultsPage({suggest: item})}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                    <Text style={{ marginLeft: 10 }}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>
            {/* Back button */}
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                <FontAwesome name="arrow-left" size={24} color="black" />
            </TouchableOpacity>

            <View>
                <TextInput 
                    style={styles.searchInput}
                    placeholder="Search for offers"
                    onChangeText={text => fillerSuggestions(text)}
                    value={searchText}
                />
            </View>

            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Suggestions</Text>
            <ScrollView 
                horizontal={true} 
                contentContainerStyle={[
                    styles.suggetionsBlock,
                    loading ? {
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    } : {}
                ]}
            >
                {loading ? 
                    <ActivityIndicator size="large" color="#0047D2" style={styles.loadingSpin} />
                    :
                    <FlatList 
                        data={suggestions}
                        renderItem={suggetItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                }
            </ScrollView>

            {/* Apply button */}
            <View style={styles.applyButtonContainer}>
                <TouchableOpacity style={styles.applyButton} onPress={() => {
                    if (searchText.trim() !== "") {
                        navigation.navigate('FilterOffersResults', {suggest: {name: searchText}});
                    }
                }}>
                    <Text style={styles.applyButtonText}>Apply</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        padding: 20,
        paddingTop: 80,
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 999,
    },
    suggetionsBlock: {
        marginBottom: 50,
        marginLeft: 20,
        height: 550,
        width: '100%',
    },
    searchInput: {
        width: '100%',
        padding: 10,
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        marginBottom: 20,
    },
    loadingSpin: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    applyButton: {
        backgroundColor: '#0047D2',
        borderRadius: 20,
        paddingVertical: 15,
    },
    applyButtonContainer: {
        zIndex: 999,
        height: 70,
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        width: '100',
        alignContent: 'center',
        justifyContent: 'center',
        padding: 0,
        paddingHorizontal: 20,
    },
    applyButtonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
});