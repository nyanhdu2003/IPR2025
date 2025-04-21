import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import CameraFunction from './Camera/CameraFunction';
import VideoScreen from './Camera/Video';
import QRScanner from './Camera/QRScanner';
import QRScanResults from './Camera/QRScannerResults';

function HomeScreen({ navigation }) {  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TouchableOpacity
        style={styles.button}
      >
        <Text
          style={styles.buttonText}
          onPress={() => navigation.navigate("Camera")}
        >
          Camera
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
      >
        <Text
          style={styles.buttonText}
          onPress={() => navigation.navigate("QRScanner")}
        >
          QR Scanner
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Camera" component={CameraFunction}/>
        <Stack.Screen name="Video" component={VideoScreen}/>
        <Stack.Screen name="QRScanner" component={QRScanner}/>
        <Stack.Screen name="QRScanResults" component={QRScanResults}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  button: {
    width: "80%",
    padding: 5,
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 15,
    marginVertical: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "red",
  },
});

export default App;