// import React, { useState, useEffect, useRef } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Button } from 'react-native';
// import * as ExpoCamera from 'expo-camera';
// const { Camera } = ExpoCamera;

// export default function RecordScreen({ navigation }) {
//   const [type, setType] = useState('back');
//   const [hasPermission, setHasPermission] = useState(null);
//   const [isRecording, setIsRecording] = useState(false);
//   const cameraRef = useRef(null);

//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       const { status: micStatus } = await Camera.requestMicrophonePermissionsAsync();
//       setHasPermission(status === 'granted' && micStatus === 'granted');
//     })();
//   }, []);

//   const toggleCameraType = () => {
//     setType(current => (current === 'back' ? 'front' : 'back'));
//   };

//   const startRecording = async () => {
//     if (cameraRef.current) {
//       setIsRecording(true);
//       try {
//         const video = await cameraRef.current.recordAsync();
//         console.log('Video recorded:', video);
//       } catch (error) {
//         console.error('Failed to record video:', error);
//       }
//     }
//   };

//   const stopRecording = async () => {
//     if (cameraRef.current && isRecording) {
//       cameraRef.current.stopRecording();
//       setIsRecording(false);
//     }
//   };

//   if (hasPermission === null) {
//     return <View style={styles.container}><Text>Requesting camera permission...</Text></View>;
//   }
  
//   if (hasPermission === false) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.message}>We need your permission to show the camera</Text>
//         <Button 
//           title="Grant Permission"
//           onPress={() => Camera.requestCameraPermissionsAsync()}
//         />
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//           <Text style={styles.backButtonText}>{'<'}</Text>
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Record Screen</Text>
//         <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={styles.settingsButton}>
//           <Text style={styles.settingsIcon}>⚙️</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.cameraContainer}>
//         <Camera
//           ref={cameraRef}
//           style={styles.camera}
//           type={type}
//         >
//           <View style={styles.flipButtonContainer}>
//             <TouchableOpacity onPress={toggleCameraType} style={styles.flipButton}>
//               <Text style={styles.flipText}>Flip</Text>
//             </TouchableOpacity>
//           </View>
//         </Camera>
//       </View>

//       {isRecording && (
//         <View style={styles.recordingIndicator}>
//           <Text style={styles.recordingText}>Recording</Text>
//         </View>
//       )}

//       <View style={styles.controls}>
//         <TouchableOpacity 
//           style={[styles.button, styles.startButton]} 
//           onPress={startRecording}
//           disabled={isRecording}
//         >
//           <Text style={styles.buttonText}>Start</Text>
//         </TouchableOpacity>
        
//         <TouchableOpacity 
//           style={[styles.button, styles.stopButton]} 
//           onPress={stopRecording}
//           disabled={!isRecording}
//         >
//           <Text style={styles.buttonText}>Stop</Text>
//         </TouchableOpacity>
//       </View>

//       <TouchableOpacity style={styles.backToMainButton} onPress={() => navigation.navigate('Main')}>
//         <Text style={styles.backToMainText}>Back</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f0f0f0',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: 15,
//     paddingTop: 20,
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//   },
//   backButton: {
//     padding: 5,
//   },
//   backButtonText: {
//     fontSize: 22,
//     fontWeight: 'bold',
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   settingsButton: {
//     padding: 5,
//   },
//   settingsIcon: {
//     fontSize: 22,
//   },
//   cameraContainer: {
//     flex: 1,
//     margin: 20,
//     borderRadius: 20,
//     overflow: 'hidden',
//   },
//   camera: {
//     flex: 1,
//   },
//   message: {
//     textAlign: 'center',
//     padding: 20,
//     fontSize: 16,
//   },
//   flipButtonContainer: {
//     position: 'absolute',
//     top: 20,
//     right: 20,
//   },
//   flipButton: {
//     backgroundColor: 'rgba(0,0,0,0.4)',
//     padding: 10,
//     borderRadius: 5,
//   },
//   flipText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   recordingIndicator: {
//     marginVertical: 10,
//     alignItems: 'center',
//   },
//   recordingText: {
//     color: '#ff4757',
//     fontWeight: 'bold',
//     fontSize: 16,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     backgroundColor: '#fff',
//     borderRadius: 50,
//   },
//   controls: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 20,
//   },
//   button: {
//     paddingVertical: 12,
//     paddingHorizontal: 30,
//     borderRadius: 25,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   startButton: {
//     backgroundColor: '#2ecc71',
//   },
//   stopButton: {
//     backgroundColor: '#ff4757',
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   backToMainButton: {
//     padding: 15,
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   backToMainText: {
//     fontSize: 16,
//     fontWeight: '500',
//   },
// });