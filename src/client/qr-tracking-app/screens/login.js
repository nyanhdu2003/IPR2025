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
    if (!account || !password) {
      Alert.alert('Lỗi', 'Vui lòng nhập tài khoản và mật khẩu.');
      return;
    }
  
    try {
      const res = await axios.post('http://localhost:5181/api/Auth/login', {
        username: account,
        password: password
      });
  
      console.log('Phản hồi từ API:', res.data);
  
      if (res.status === 200 && res.data.data) {
        const token = res.data.data;
  
        try {
          await AsyncStorage.setItem('token', token);
          console.log('Token đã được lưu:', token);
          navigation.replace('MainScreen'); // Điều hướng sang MainScreen
        } catch (err) {
          console.error('Lỗi khi lưu token:', err);
          Alert.alert('Lỗi', 'Không thể lưu thông tin đăng nhập.');
        }
      } else {
        Alert.alert('Đăng nhập thất bại', 'Phản hồi không hợp lệ từ máy chủ.');
      }
    } catch (err) {
      console.error('Lỗi đăng nhập:', err);
      if (err.response && err.response.status === 401) {
        Alert.alert('Đăng nhập thất bại', 'Tài khoản hoặc mật khẩu không đúng.');
      } else {
        Alert.alert('Lỗi', 'Không thể kết nối đến máy chủ.');
      }
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
