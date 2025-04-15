// import React from 'react';
// import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';

// export default function SettingsScreen({ navigation }) {
//   // You would normally get this data from your app's state or context
//   const userName = "HuyNQ";
//   const userId = "ID: 12332112332";

//   const handleLogout = () => {
//     // Add your logout logic here
//     console.log('User logged out');
//     // Navigate to login screen or wherever appropriate after logout
//     // For now, we'll just go back to main
//     navigation.navigate('Main');
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//           <Text style={styles.backButtonText}>{'<'}</Text>
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Setting</Text>
//         <View style={styles.settingsIcon}>
//           <Text>⚙️</Text>
//         </View>
//       </View>

//       <View style={styles.content}>
//         <TouchableOpacity style={styles.infoBlock}>
//           <Text style={styles.infoText}>{userName}</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.infoBlock}>
//           <Text style={styles.infoText}>{userId}</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//           <Text style={styles.logoutText}>Log out</Text>
//         </TouchableOpacity>
//       </View>

//       <TouchableOpacity 
//         style={styles.backToMainButton} 
//         onPress={() => navigation.navigate('Main')}
//       >
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
//   settingsIcon: {
//     padding: 5,
//     opacity: 0, // Making this invisible since we're already on settings page
//   },
//   content: {
//     flex: 1,
//     padding: 20,
//     justifyContent: 'flex-start',
//   },
//   infoBlock: {
//     backgroundColor: '#fff',
//     borderRadius: 15,
//     padding: 20,
//     marginBottom: 15,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 3,
//   },
//   infoText: {
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   logoutButton: {
//     backgroundColor: '#fff',
//     borderRadius: 15,
//     padding: 20,
//     marginTop: 5,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 3,
//   },
//   logoutText: {
//     fontSize: 16,
//     fontWeight: '500',
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