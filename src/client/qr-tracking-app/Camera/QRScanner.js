import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useState, useEffect } from "react";
import { Camera, CameraView } from "expo-camera";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

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

  const handleBarcodeScanned = ({ type, data }) => {
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
      navigation.navigate("Camera", { qrData: data }); // Pass raw UUID data
    } catch (error) {
      console.error("Navigation error:", error);
      Alert.alert("Lỗi", "Không thể chuyển đến màn hình camera. Vui lòng thử lại.");
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