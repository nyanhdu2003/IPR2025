import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function MainScreen({ navigation }) {
  return (
    <LinearGradient colors={['#0f0c29', '#302b63', '#24243e']} style={styles.container}>
      <Text style={styles.title}>Main</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Camera')}
            >
        <Text style={styles.buttonText}>Start Video recording</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('QRScanner')}
            >
        <Text style={styles.buttonText}>Start QRScanner </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('History')}>
        <Text style={styles.buttonText}>History</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Setting')}>
        <Text style={styles.buttonText}>Setting</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#00ffe7',
    marginBottom: 40,
    textShadowColor: '#00ffe7',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  button: {
    backgroundColor: '#111',
    width: '100%',
    paddingVertical: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#00fff0',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
  },
  buttonText: {
    color: '#00ffe7',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: '#00ffe7',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  }
});