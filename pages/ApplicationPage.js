import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomTabBar from '../components/BottomTabBar';

export default function ApplicationPage({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Hello, this is the Application page</Text>
      <BottomTabBar navigation={navigation} state={{ routeNames: ['Home', 'Saved', 'Application', 'Notification', 'Profile'], index: 2 }} />
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
