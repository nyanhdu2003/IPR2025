import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen({ navigation }) {
  const [user, setUser] = useState({ fullName: '', id: '', role: '' });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          Alert.alert('No token found', 'Please login again');
          navigation.navigate('Login');
          return;
        }

        const response = await fetch('http://192.168.250.210:7007/api/Auth/user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }

        const data = await response.json();
        setUser({
          fullName: data.data.fullName,
          id: data.data.id,
          role: data.data.role,
        });
      } catch (error) {
        console.error('Fetch user error:', error);
        Alert.alert('Error', 'Failed to load user info');
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      console.log('Token removed, user logged out');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Error', 'Failed to log out');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Setting</Text>
        <View style={styles.settingsIcon}>
          <Text>⚙️</Text>
        </View>
      </View>

      <View style={styles.content}>
        <TouchableOpacity style={styles.infoBlock}>
          <Text style={styles.infoText}>{user.fullName}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoBlock}>
          <Text style={styles.infoText}>ID: {user.id}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoBlock}>
          <Text style={styles.infoText}>Role: {user.role}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.backToMainButton} 
        onPress={() => navigation.navigate('Main')}
      >
        <Text style={styles.backToMainText}>Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    paddingTop: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 5,
  },
  backButtonText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  settingsIcon: {
    padding: 5,
    opacity: 0,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
  infoBlock: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  infoText: {
    fontSize: 16,
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginTop: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '500',
  },
  backToMainButton: {
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  backToMainText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
