import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomTabBar from '../components/BottomTabBar';

export default function ProfilePage({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Hello, this is the Profile page</Text>
      <BottomTabBar navigation={navigation} state={{ routeNames: ['Home', 'Saved', 'Application', 'Notification', 'Profile'], index: 4 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
