import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  SafeAreaView, Image, Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import FloatingLabelInput from '../components/FloatingLabelInput';

export default function LoginScreen({ navigation }) {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);

  const handleLogin = async () => {
    try {
      const res = await axios.post('https://your-api.com/api/auth/login', {
        email: account,
        password: password
      });
      const { token } = res.data;
      await AsyncStorage.setItem('token', token);
      navigation.replace('MainScreen');
    } catch (err) {
      Alert.alert('Đăng nhập thất bại', 'Tài khoản hoặc mật khẩu không đúng');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome</Text>

      <FloatingLabelInput
        label="Account"
        value={account}
        onChangeText={setAccount}
      />

      <FloatingLabelInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={secure}
        showEyeIcon
        onToggleSecure={() => setSecure(!secure)}
      />



      <TouchableOpacity onPress={handleLogin}>
        <LinearGradient
          colors={['#4facfe', '#9b23ea']}
          style={styles.button}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.buttonText}>SIGN IN</Text>
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff'
  },
  title: {
    fontSize: 32, fontWeight: 'bold', marginBottom: 40,
  },
  input: {
    width: '100%', borderBottomWidth: 1, borderColor: '#ccc',
    marginBottom: 25, fontSize: 16, paddingVertical: 8,
  },
  passwordContainer: {
    width: '100%', borderBottomWidth: 1, borderColor: '#ccc',
    flexDirection: 'row', alignItems: 'center', marginBottom: 40,
  },
  passwordInput: {
    flex: 1, fontSize: 16, paddingVertical: 8,
  },
  eyeIcon: {
    fontSize: 20, padding: 4,
  },
  button: {
    width: 220, height: 50, borderRadius: 25,
    justifyContent: 'center', alignItems: 'center'
  },
  buttonText: {
    color: '#fff', fontWeight: 'bold', fontSize: 16,
  }
});
