import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function FilterOptionsPage({route}) {
    const navigation = useNavigation();

    const LastOptions = route.params?.filterOptions || [];
    const suggest = route.params?.suggest;
    console.log('LastOptions:', LastOptions);

    const [lastUpdateOpen, setLastUpdateOpen] = useState(true);
    const [lastUpdateOption, setLastUpdateOption] = useState('Anytime');

    const updateLastUpdateOption = (option) => {
        setLastUpdateOption(option);
    };

    // workplace functions
    const [workplaceOpen, setWorkplaceOpen] = useState(true);
    const [selectedWorkplaceOptions, setSelectedWorkplaceOptions] = useState([]);

    const updateWorkplaceOption = (option) => {
        console.log('Option:', option);
        console.log('Selected Options:', selectedWorkplaceOptions);
        const updatedOptions = selectedWorkplaceOptions.includes(option)
            ? selectedWorkplaceOptions.filter(item => item !== option)
            : [...selectedWorkplaceOptions, option];

        setSelectedWorkplaceOptions(updatedOptions);
        console.log('Updated Options:', updatedOptions);
    };

    // internship type functions
    const [internshipTypeOpen, setInternshipTypeOpen] = useState(true);
    const [selectedInternshipType, setSelectedInternshipType] = useState([]);

    const updateInternshipType = (type) => {
        const index = selectedInternshipType.indexOf(type);
        if (index === -1) {
            setSelectedInternshipType([...selectedInternshipType, type]);
        } else {
            const updatedSelectedTypes = [...selectedInternshipType];
            updatedSelectedTypes.splice(index, 1);
            setSelectedInternshipType(updatedSelectedTypes);
        }
    };


    // cities functions
    const [cityOpen, setCityOpen] = useState(true);
    const [selectedCities, setSelectedCities] = useState([]);

    const updateCityOption = (city) => {
        const index = selectedCities.indexOf(city);
        if (index === -1) {
            setSelectedCities([...selectedCities, city]);
        } else {
            const updatedSelectedCities = [...selectedCities];
            updatedSelectedCities.splice(index, 1);
            setSelectedCities(updatedSelectedCities);
        }
    };


    // etude functions 
    const [etudesOpen, setEtudesOpen] = useState(true);
    const [selectedEtudesOption, setSelectedEtudesOption] = useState('');

    const updateEtudesOption = (option) => {
        setSelectedEtudesOption(option);
    };

    const navigateToResultsPage = () => {

        const filterOptions = {
            lastUpdateOption: lastUpdateOption,
            workPlace: selectedWorkplaceOptions,
            city: selectedCities,
            internshipType: selectedInternshipType,
            etudes: selectedEtudesOption,
        };

        console.log('Filter Options:', filterOptions);
        navigation.navigate('FilterOffersResults', { filterOptions: filterOptions, suggest: suggest });
    }

    return (
        <View style={styles.container}>
            <FontAwesome5
                name="arrow-left"
                size={24}
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            />
            <View style={styles.sectionsContainer}>
                {/* section for last update */}
                <View style={styles.section}>
                    <TouchableOpacity onPress={() => setLastUpdateOpen(!lastUpdateOpen)}>

                        <View style={styles.sectionHeader}>
                            <Text>Last Update</Text>
                            <FontAwesome5
                                name={lastUpdateOpen ? 'chevron-up' : 'chevron-down'}
                                size={16}
                            />
                        </View>
                    </TouchableOpacity>
                    {lastUpdateOpen && (
                        <View style={styles.options}>
                            <TouchableOpacity
                                style={[styles.radioButton, lastUpdateOption === 'Recent' && styles.radioButtonSelected]}
                                onPress={() => updateLastUpdateOption('Recent')}>
                                <View style={[styles.radioButtonCircle, lastUpdateOption === 'Recent' && styles.radioButtonCircleSelected]}>
                                </View>
                                <Text>Recent</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.radioButton, lastUpdateOption === 'Last Week' && styles.radioButtonSelected]}
                                onPress={() => updateLastUpdateOption('Last Week')}>
                                <View style={[styles.radioButtonCircle, lastUpdateOption === 'Last Week' && styles.radioButtonCircleSelected]}>
                                </View>
                                <Text>Last Week</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.radioButton, lastUpdateOption === 'Last Month' && styles.radioButtonSelected]}
                                onPress={() => updateLastUpdateOption('Last Month')}>
                                <View style={[styles.radioButtonCircle, lastUpdateOption === 'Last Month' && styles.radioButtonCircleSelected]}>
                                </View>
                                <Text>Last Month</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.radioButton, lastUpdateOption === 'Anytime' && styles.radioButtonSelected]}
                                onPress={() => updateLastUpdateOption('Anytime')}>
                                <View style={[styles.radioButtonCircle, lastUpdateOption === 'Anytime' && styles.radioButtonCircleSelected]}>
                                </View>
                                <Text>Anytime</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                {/* section for type of workplace */}
                <View style={styles.section}>
                    <TouchableOpacity onPress={() => setWorkplaceOpen(!workplaceOpen)}>

                        <View style={styles.sectionHeader}>
                            <Text>Type of Workplace</Text>
                            <FontAwesome5
                                name={workplaceOpen ? 'chevron-up' : 'chevron-down'}
                                size={16}
                            />
                        </View>
                    </TouchableOpacity>
                    {workplaceOpen && (
                        <View style={styles.options}>
                            <TouchableOpacity
                                style={[
                                    styles.checkboxContainer,
                                    selectedWorkplaceOptions.includes('On Site') && styles.checkboxContainerSelected,
                                ]}
                                onPress={() => updateWorkplaceOption('On Site')}>
                                <FontAwesome5
                                    name={selectedWorkplaceOptions.includes('On Site') ? 'check-square' : 'square'}
                                    size={20}
                                    color={selectedWorkplaceOptions.includes('On Site') ? '#0f52d4' : 'gray'}
                                    style={{ marginRight: 10 }}
                                />
                                <Text style={styles.checkboxLabel}>On site</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.checkboxContainer,
                                    selectedWorkplaceOptions.includes('Hybrid') && styles.checkboxContainerSelected,
                                ]}
                                onPress={() => updateWorkplaceOption('Hybrid')}>
                                <FontAwesome5
                                    name={selectedWorkplaceOptions.includes('Hybrid') ? 'check-square' : 'square'}
                                    size={20}
                                    color={selectedWorkplaceOptions.includes('Hybrid') ? '#0f52d4' : 'gray'}
                                    style={{ marginRight: 10 }}
                                />
                                <Text style={styles.checkboxLabel}>Hybrid</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.checkboxContainer,
                                    selectedWorkplaceOptions.includes('Remote') && styles.checkboxContainerSelected,
                                ]}
                                onPress={() => updateWorkplaceOption('Remote')}>
                                <FontAwesome5
                                    name={selectedWorkplaceOptions.includes('Remote') ? 'check-square' : 'square'}
                                    size={20}
                                    color={selectedWorkplaceOptions.includes('Remote') ? '#0f52d4' : 'gray'}
                                    style={{ marginRight: 10 }}
                                />
                                <Text style={styles.checkboxLabel}>Remote</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                {/* section for internship type */}
                <View style={styles.section}>
                    <TouchableOpacity onPress={() => setInternshipTypeOpen(!internshipTypeOpen)}>
                        <View style={styles.sectionHeader}>
                            <Text>Internship Type</Text>
                            <FontAwesome5
                                name={internshipTypeOpen ? 'chevron-up' : 'chevron-down'}
                                size={16}

                            />
                        </View>
                    </TouchableOpacity>
                    {internshipTypeOpen && (
                        <View style={styles.optionsTag}>
                            <TouchableOpacity
                                style={[
                                    styles.tag,
                                    selectedInternshipType.includes('Paid') && { backgroundColor: '#0f52d4' },
                                ]}
                                onPress={() => updateInternshipType('Paid')}>
                                <Text style={[
                                    styles.tagText,
                                    selectedInternshipType.includes('Paid') && { color: 'white' },
                                ]}>Paid</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.tag,
                                    selectedInternshipType.includes('PFE') && { backgroundColor: '#0f52d4' },
                                ]}
                                onPress={() => updateInternshipType('PFE')}>
                                <Text style={[
                                    styles.tagText,
                                    selectedInternshipType.includes('PFE') && { color: 'white' },
                                ]}>PFE</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.tag,
                                    selectedInternshipType.includes('Pre-Employment') && { backgroundColor: '#0f52d4' },
                                ]}
                                onPress={() => updateInternshipType('Pre-Employment')}>
                                <Text style={[
                                    styles.tagText,
                                    selectedInternshipType.includes('Pre-Employment') && { color: 'white' },
                                ]}>Pre-Employment</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.tag,
                                    selectedInternshipType.includes('Unpaid') && { backgroundColor: '#0f52d4' },
                                ]}
                                onPress={() => updateInternshipType('Unpaid')}>
                                <Text style={[
                                    styles.tagText,
                                    selectedInternshipType.includes('Unpaid') && { color: 'white' },
                                ]}>Unpaid</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                {/* section for cities */}
                <View style={styles.section}>
                    <TouchableOpacity onPress={() => { setCityOpen(!cityOpen) }}>

                        <View style={styles.sectionHeader}>
                            <Text>City</Text>
                            <FontAwesome5
                                name={cityOpen ? 'chevron-up' : 'chevron-down'}
                                size={16}
                            />
                        </View>
                    </TouchableOpacity>
                    {cityOpen && (
                        <View style={styles.options}>
                            <TouchableOpacity
                                style={[
                                    styles.checkboxContainer,
                                    selectedCities.includes('Rabat') && styles.checkboxContainerSelected,
                                ]}
                                onPress={() => updateCityOption('Rabat')}>
                                <FontAwesome5
                                    name={selectedCities.includes('Rabat') ? 'check-square' : 'square'}
                                    size={20}
                                    color={selectedCities.includes('Rabat') ? '#0f52d4' : 'gray'}
                                    style={{ marginRight: 10 }}
                                />
                                <Text style={styles.checkboxLabel}>Rabat</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.checkboxContainer,
                                    selectedCities.includes('Casablanca') && styles.checkboxContainerSelected,
                                ]}
                                onPress={() => updateCityOption('Casablanca')}>
                                <FontAwesome5
                                    name={selectedCities.includes('Casablanca') ? 'check-square' : 'square'}
                                    size={20}
                                    color={selectedCities.includes('Casablanca') ? '#0f52d4' : 'gray'}
                                    style={{ marginRight: 10 }}
                                />
                                <Text style={styles.checkboxLabel}>Casablanca</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.checkboxContainer,
                                    selectedCities.includes('Tanger') && styles.checkboxContainerSelected,
                                ]}
                                onPress={() => updateCityOption('Tanger')}>
                                <FontAwesome5
                                    name={selectedCities.includes('Tanger') ? 'check-square' : 'square'}
                                    size={20}
                                    color={selectedCities.includes('Tanger') ? '#0f52d4' : 'gray'}
                                    style={{ marginRight: 10 }}
                                />
                                <Text style={styles.checkboxLabel}>Tanger</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.checkboxContainer,
                                    selectedCities.includes('Marrakech') && styles.checkboxContainerSelected,
                                ]}
                                onPress={() => updateCityOption('Marrakech')}>
                                <FontAwesome5
                                    name={selectedCities.includes('Marrakech') ? 'check-square' : 'square'}
                                    size={20}
                                    color={selectedCities.includes('Marrakech') ? '#0f52d4' : 'gray'}
                                    style={{ marginRight: 10 }}
                                />
                                <Text style={styles.checkboxLabel}>Marrakech</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                {/* section for etudes  */}
                <View style={styles.section}>
                    <TouchableOpacity onPress={() => { setEtudesOpen(!etudesOpen) }}>
                        <View style={styles.sectionHeader}>
                            <Text>Etudes</Text>

                            <FontAwesome5
                                name={etudesOpen ? 'chevron-up' : 'chevron-down'}
                                size={16}
                            />
                        </View>
                    </TouchableOpacity>
                    {etudesOpen && (
                        <View style={styles.options}>
                            <TouchableOpacity
                                style={[
                                    styles.radioButton,
                                    selectedEtudesOption === 'Bac+1' && styles.radioButtonSelected
                                ]}
                                onPress={() => updateEtudesOption('Bac+1')}>
                                <View style={[styles.radioButtonCircle, selectedEtudesOption === 'Bac+1' && styles.radioButtonCircleSelected]}></View>
                                <Text>Bac+1</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.radioButton,
                                    selectedEtudesOption === 'Bac+2' && styles.radioButtonSelected
                                ]}
                                onPress={() => updateEtudesOption('Bac+2')}>
                                <View style={[styles.radioButtonCircle, selectedEtudesOption === 'Bac+2' && styles.radioButtonCircleSelected]}></View>
                                <Text>Bac+2</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.radioButton,
                                    selectedEtudesOption === 'Bac+3' && styles.radioButtonSelected
                                ]}
                                onPress={() => updateEtudesOption('Bac+3')}>
                                <View style={[styles.radioButtonCircle, selectedEtudesOption === 'Bac+3' && styles.radioButtonCircleSelected]}></View>
                                <Text>Bac+3</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.radioButton,
                                    selectedEtudesOption === 'Bac+4' && styles.radioButtonSelected
                                ]}
                                onPress={() => updateEtudesOption('Bac+4')}>
                                <View style={[styles.radioButtonCircle, selectedEtudesOption === 'Bac+4' && styles.radioButtonCircleSelected]}></View>
                                <Text>Bac+4</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.radioButton,
                                    selectedEtudesOption === 'Bac+5' && styles.radioButtonSelected
                                ]}
                                onPress={() => updateEtudesOption('Bac+5')}>
                                <View style={[styles.radioButtonCircle, selectedEtudesOption === 'Bac+5' && styles.radioButtonCircleSelected]}></View>
                                <Text>Bac+5</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

            </View>

            {/* Apply button */}
            <View style={styles.applyButtonContainer}>
                <TouchableOpacity style={styles.applyButton} onPress={navigateToResultsPage}>
                    <Text style={styles.applyButtonText}>Apply</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sectionsContainer: {
        marginTop: 20,
        marginHorizontal: 20,
    },
    backButton: {
        marginTop: 50,
        marginLeft: 20,
    },
    section: {
        marginBottom: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    options: {
        paddingHorizontal: 10,
        marginTop: 12,
        marginLeft: 15,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    radioButtonCircle: {
        marginRight: 10,
        height: 20,
        width: 20,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioButtonCircleSelected: {
        backgroundColor: '#0f52d4',
        borderColor: '#0f52d4',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        marginLeft: 3,
    },
    checkboxContainerSelected: {
        borderRadius: 5,
    },
    checkboxLabel: {
        marginLeft: 10,
    },
    optionsTag: {
        marginLeft: 20,
        marginTop: 12,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    tag: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginRight: 10,
        marginBottom: 5,
        borderRadius: 20,
        backgroundColor: 'lightgray',
    },
    tagText: {
        color: '#8d8c8e',
        fontSize: 13,
    },
    checkboxContainerSelected: {
        borderRadius: 5,
    },
    checkboxLabel: {
        marginLeft: 10,
    },
    etudesContainer: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
    },
    etudesSection: {
        marginBottom: 20,
    },
    etudesSectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    etudesOptions: {
        padding: 10,
        marginTop: 12,
        marginLeft: 15,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    radioButtonCircle: {
        marginRight: 10,
        height: 20,
        width: 20,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioButtonCircleSelected: {
        backgroundColor: '#0f52d4',
        borderColor: '#0f52d4',
    },
    applyButton: {
        backgroundColor: '#0047D2',
        borderRadius: 20,
        paddingVertical: 15,
        position: 'absolute',
        bottom: 10,
        left: 20,
        right: 20,
    },
    applyButtonContainer: {
        width: '100%',
        height: 50,
        position: 'absolute',
        bottom: 0,
    },
    applyButtonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
});