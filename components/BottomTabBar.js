import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native'; // Import useNavigation and useRoute hooks

export default function BottomTabBar({ navigation, savedItemsCount }) {
  const route = useRoute();

  const tabs = [
    { name: 'Home', icon: 'home', route: 'Home' },
    { name: 'Saved', icon: 'bookmark', route: 'Saved' },
    { name: 'Application', icon: 'file-alt', route: 'Application' },
    { name: 'Notification', icon: 'bell', route: 'Notification' },
    { name: 'Profile', icon: 'user', route: 'Profile' },
  ];

  const handleTabPress = (route) => {
    navigation.navigate(route);
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.route}
          style={styles.tabItem}
          onPress={() => handleTabPress(tab.route)}
        >
          {tab.name === 'Saved' && savedItemsCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{savedItemsCount}</Text>
            </View>
          )}
          <FontAwesome5
            name={tab.icon}
            size={20}
            color={route.name === tab.route ? '#0047D2' : '#666'}
          />
          <Text style={[styles.tabText, { color: route.name === tab.route ? '#0047D2' : '#666' }]}>
            {tab.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 15,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabItem: {
    alignItems: 'center',
  },
  tabText: {
    fontSize: 12,
    marginTop: 5,
  },
  badge: {
    position: 'absolute',
    top: 5,
    right: 15,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
  },
});