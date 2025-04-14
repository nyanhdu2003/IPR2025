import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function FloatingLabelInput({
  label,
  value,
  onChangeText,
  secureTextEntry,
  showEyeIcon = false,
  onToggleSecure,
}) {
  const [isFocused, setIsFocused] = useState(false);

  const shouldFloat = isFocused || value.length > 0;

  return (
    <View style={styles.container}>
      <Text style={[styles.label, shouldFloat && styles.floatingLabel]}>
        {label}
      </Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        secureTextEntry={secureTextEntry}
      />
      {showEyeIcon && (
        <TouchableOpacity onPress={onToggleSecure} style={styles.eyeIcon}>
          <Text>{secureTextEntry ? '👁️' : '🙈'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    marginBottom: 30,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    position: 'relative',
    width: '100%',
  },
  label: {
    position: 'absolute',
    left: 0,
    top: 18,
    fontSize: 16,
    color: '#999',
  },
  floatingLabel: {
    top: 0,
    fontSize: 12,
    color: '#666',
  },
  input: {
    fontSize: 16,           // giữ kích cỡ người dùng nhập
    color: '#000',          // màu chữ rõ
    height: 40,             // đủ chiều cao để thấy chữ
    paddingVertical: 8,     // thêm padding để text không bị cắt
    paddingRight: 35,       // chừa chỗ cho icon
  },
  
  eyeIcon: {
    position: 'absolute',
    right: 0,
    top: 18,
  },
});
