import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/login';
import MainScreen from './screens/mainScreen';
import HistoryScreen from './screens/history';
import VideoDetail from './screens/videoDetail';
import SettingsScreen from './screens/setting';
import CameraFunction from './Camera/CameraFunction';
import VideoScreen from './Camera/Video';
import QRScanner from './Camera/QRScanner';
import QRScanResults from './Camera/QRScannerResults';
import VideoAndQRPreview from "./Camera/VideoAndQRPreview";


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="History"
          component={HistoryScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VideoDetail"
          component={VideoDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Setting"
          component={SettingsScreen}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
        <Stack.Screen name="Camera" component={CameraFunction}/>
        <Stack.Screen name="Video" component={VideoScreen}/>
        <Stack.Screen name="QRScanner" component={QRScanner}/>
        <Stack.Screen name="QRScanResults" component={QRScanResults}/>
        <Stack.Screen name="VideoAndQRPreview" component={VideoAndQRPreview} options={{ title: "Preview" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}