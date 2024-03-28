import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import Home from './pages/HomePage';
import SavedPage from './pages/SavedPage';

const Tab = createBottomTabNavigator();

const MainNavigation = ({ savedData, savedItems }) => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = 'home';
                    } else if (route.name === 'Saved') {
                        iconName = 'bookmark';
                    } else if (route.name === 'Application') {
                        iconName = 'briefcase';
                    } else if (route.name === 'Notification') {
                        iconName = 'bell';
                    } else if (route.name === 'Profile') {
                        iconName = 'user';
                    }

                    return <FontAwesome5 name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: '#0047D2',
                inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen
                name="Saved"
                component={SavedPage}
                initialParams={{ savedItems }} // Pass savedItems only
            />

            <Tab.Screen
                name="Saved"
                component={SavedPage}
                initialParams={{ savedItems }} // Pass savedItems only
            />


        </Tab.Navigator>
    );
};

export default MainNavigation;