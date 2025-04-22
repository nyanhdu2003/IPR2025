import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useState, useEffect } from "react";
import { Camera, CameraView } from "expo-camera";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { IPV4_API } from '../../qr-tracking-app/ipv4';

export default function QRScanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [qrData, setQrData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === "granted");
      } catch (error) {
        console.error("Error requesting camera permission:", error);
        setHasPermission(false);
      }
    };

    getCameraPermission();
  }, []);

  if (hasPermission === null) {
    return <Text style={styles.message}>Đang yêu cầu quyền truy cập camera...</Text>;
  }

  if (hasPermission === false) {
    return <Text style={styles.message}>Không có quyền truy cập camera</Text>;
  }

  // UUID validation function
  const isValidUUID = (str) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(str);
  };

  const handleBarcodeScanned = async ({ type, data }) => {
    console.log("QR Scanned:", { type, data });
    setScanned(true);
    setQrData(data);

    // Validate that data is a UUID
    if (!isValidUUID(data)) {
      Alert.alert("Lỗi", "Mã QR phải chứa một UUID hợp lệ.");
      setScanned(false);
      setQrData(null);
      return;
    }

    try {
      // Get token from AsyncStorage
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert("Lỗi", "Không tìm thấy token xác thực. Vui lòng đăng nhập.");
        setScanned(false);
        setQrData(null);
        return;
      }

      // Call API to check for videos
      const response = await axios.get(`${IPV4_API}/Video/get-by-product/${data}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const videos = response.data.data || response.data;
      console.log("API Response:", videos);

      if (Array.isArray(videos) && videos.length > 0) {
        // Navigate to VideoDetail with the first video's ID
        const videoId = videos[0].id || videos[0].videoId; // Adjust based on actual field name
        if (!videoId) {
          throw new Error("Không tìm thấy videoId trong phản hồi API.");
        }
        navigation.navigate("VideoDetail", { videoId });
      } else {
        // Navigate to Camera to record a new video
        navigation.navigate("Camera", { qrData: data });
      }
    } catch (error) {
      console.error("Error in handleBarcodeScanned:", error);
      let errorMessage = error.message;
      if (error.response) {
        // API returned an error response
        errorMessage = `Lỗi API: ${error.response.status} - ${error.response.data.message || error.response.data}`;
      } else if (error.message.includes("Network Error")) {
        errorMessage = "Không thể kết nối đến server. Vui lòng kiểm tra mạng.";
      }
      Alert.alert("Lỗi", errorMessage);
      setScanned(false);
      setQrData(null);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417"],
        }}
        style={StyleSheet.absoluteFillObject}
      />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("MainScreen")}
      >
        <Ionicons name="arrow-back" size={30} color="white" />
      </TouchableOpacity>
      <View style={styles.debugInfo}>
        <Text style={styles.debugText}>QR Scanning: {scanned ? "OFF" : "ON"}</Text>
        {qrData && (
          <Text style={styles.qrDataText}>Dữ liệu QR: {qrData}</Text>
        )}
      </View>
      {scanned && (
        <TouchableOpacity
          style={styles.scanAgainButton}
          onPress={() => {
            setScanned(false);
            setQrData(null);
          }}
        >
          <Text style={styles.scanAgainText}>QUÉT LẠI</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  message: {
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
    backgroundColor: "black",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 5,
  },
  debugInfo: {
    position: "absolute",
    top: 100,
    left: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 5,
  },
  debugText: {
    color: "white",
    fontSize: 12,
  },
  qrDataText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
  },
  scanAgainButton: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    backgroundColor: "rgba(255,255,255,0.8)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  scanAgainText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});