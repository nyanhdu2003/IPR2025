import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Share,
    Alert,
  } from "react-native";
  import Ionicons from "@expo/vector-icons/Ionicons";
  import * as Linking from "expo-linking";
  import * as Clipboard from "expo-clipboard";
  
  export default function QRScanResults({ route }) {
    const qrData = route?.params?.qrData || "Không có dữ liệu";
  
    const openLink = () => {
      if (qrData && Linking.canOpenURL(qrData)) {
        Linking.openURL(qrData);
      } else {
        Alert.alert("Lỗi", "Dữ liệu không phải là URL hợp lệ.");
      }
    };
  
    const shareLink = async () => {
      try {
        await Share.share({
          message: qrData,
        });
      } catch (error) {
        console.error("Error in sharing:", error);
        Alert.alert("Lỗi", "Không thể chia sẻ dữ liệu.");
      }
    };
  
    const copyToClipboard = () => {
      if (qrData) {
        Clipboard.setStringAsync(qrData);
        Alert.alert("Thành công", "Đã sao chép dữ liệu vào clipboard.");
      } else {
        Alert.alert("Lỗi", "Không có dữ liệu để sao chép.");
      }
    };
  
    return (
      <View style={styles.container}>
        {qrData ? (
          <Text style={styles.urlTxt} numberOfLines={3} ellipsizeMode="tail">
            {qrData}
          </Text>
        ) : (
          <Text style={styles.urlTxt}>Không có dữ liệu mã QR</Text>
        )}
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.touchable} onPress={openLink}>
            <Text style={styles.icons}>
              <Ionicons name="open" size={45} color="white" />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchable} onPress={shareLink}>
            <Text style={styles.icons}>
              <Ionicons name="share-social" size={45} color="white" />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchable} onPress={copyToClipboard}>
            <Text style={styles.icons}>
              <Ionicons name="copy" size={45} color="white" />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: "#fff",
    },
    urlTxt: {
      fontSize: 20,
      fontWeight: "600",
      margin: 20,
      textAlign: "center",
      maxWidth: "90%",
    },
    btnContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: 30,
      width: "80%",
    },
    touchable: {
      width: "30%",
    },
    icons: {
      textAlign: "center",
      backgroundColor: "black",
      padding: 20,
      margin: 10,
      borderRadius: 10,
    },
  });