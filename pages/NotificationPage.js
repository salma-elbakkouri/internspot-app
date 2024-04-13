import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image , FlatList } from 'react-native';
import BottomTabBar from '../components/BottomTabBar';

export default function NotificationPage({ navigation }) {
  const [selectedTab, setSelectedTab] = useState('General');

  const handleTabPress = (tab) => {
    setSelectedTab(tab);
  };


  const applicationNotifications = [
    // { id: '1', image: require('../assets/amazon.jpg'), title: 'Application Sent!', content: 'Your application sent successfully to Capgemini, they will respond soon.', time: '5 minutes ago' },
    // { id: '2', image: require('../assets/amazon.jpg'), title: 'Application Accepted!', content: 'Your application Junior UX design at Amazon accepted! Contact the company right now.', time: '2 hours ago' },
    // { id: '3', image: require('../assets/amazon.jpg'), title: 'Application Rejected!', content: 'Your application to Java Developer at CGI rejected! Discover more offers match your skills.', time: '1 day ago' },
  ];


  const renderApplicationNotification = ({ item }) => (
    <View style={styles.notification}>
      <Image source={item.image} style={styles.notificationImage} />
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text>{item.content}</Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Notifications title */}
      <Text style={styles.notificationsTitle}>Notifications</Text>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'General' && styles.selectedTab]}
          onPress={() => handleTabPress('General')}
        >
          <Text style={[styles.tabText, selectedTab === 'General' && styles.selectedTabText]}>General</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Applications' && styles.selectedTab]}
          onPress={() => handleTabPress('Applications')}
        >
          <Text style={[styles.tabText, selectedTab === 'Applications' && styles.selectedTabText]}>Applications</Text>
        </TouchableOpacity>
      </View>

      {/* Content based on selected tab */}
      {selectedTab === 'General' ? (
        <View style={styles.notificationsContainer}>
          {/* First notification */}
          <View style={styles.notification}>
            <Image source={require('../assets/securitypic.png')} style={styles.notificationImage} />
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>Security Update!</Text>
              <Text>Now Internspot has a Two-Factor Authentication. Try it!</Text>
              <Text style={styles.notificationTime}>2 hours ago</Text>
            </View>
          </View>
          {/* Second notification */}
          <View style={styles.notification}>
            <Image source={require('../assets/passwordpic.png')} style={styles.notificationImage} />
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>Password Update!</Text>
              <Text>You have updated your password. Contact the support if you didn’t do that!</Text>
              <Text style={styles.notificationTime}>1 day ago</Text>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.applicationsContainer}>
        <FlatList
          data={applicationNotifications}
          renderItem={renderApplicationNotification}
          keyExtractor={item => item.id}
        />
      </View>
      )}

      {/* Bottom tab bar with navigation prop */}
      <BottomTabBar navigation={navigation} state={{ routeNames: ['Home', 'Saved', 'Application', 'Notification', 'Profile'], index: 3 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  notificationsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 12,
    marginLeft: 10,
    color: 'black',
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  tabText: {
    fontSize: 16,
    color: 'black',
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#0047D2',
  },
  selectedTabText: {
    color: '#0047D2',
  },
  notificationsContainer: {
    marginLeft:10,
    flex: 1,
  },
  notification: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  notificationImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  notificationTime: {
    color: 'gray',
  },
  applicationsText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  applicationsContainer:{
    marginLeft:10,
    marginRight:20,
  },
});
