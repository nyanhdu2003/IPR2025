// import React, { useState, useEffect, useRef } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// import { Camera } from 'expo-camera';

// export default function TestCamera() {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  
//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === 'granted');
//     })();
//   }, []);

//   if (hasPermission === null) {
//     return <View style={styles.container}><Text>Requesting permission...</Text></View>;
//   }
  
//   if (hasPermission === false) {
//     return <View style={styles.container}><Text>No access to camera</Text></View>;
//   }

//   return (
//     <View style={styles.container}>
//       <Camera style={styles.camera} type={cameraType} />
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => {
//             setCameraType(
//               cameraType === Camera.Constants.Type.back
//                 ? Camera.Constants.Type.front
//                 : Camera.Constants.Type.back
//             );
//           }}>
//           <Text style={styles.text}>Flip Camera</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   camera: {
//     flex: 1,
//   },
//   buttonContainer: {
//     position: 'absolute',
//     bottom: 20,
//     width: '100%',
//     alignItems: 'center',
//   },
//   button: {
//     backgroundColor: 'rgba(0,0,0,0.6)',
//     padding: 15,
//     borderRadius: 10,
//   },
//   text: {
//     color: 'white',
//     fontSize: 16,
//   },
// });