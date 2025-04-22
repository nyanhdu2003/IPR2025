import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as MediaLibrary from "expo-media-library";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function VideoAndQRPreview() {
  const navigation = useNavigation();
  const route = useRoute();
  const { videoUri, qrData, startedAt, endedAt } = route.params || {};

  const player = useVideoPlayer(videoUri, (player) => {
    player.loop = true;
    player.play();
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  const handleAccept = async () => {
    try {
      // Validate required fields
      if (!videoUri || !qrData || !startedAt || !endedAt) {
        throw new Error("Thiếu dữ liệu cần thiết để gửi API.");
      }

      // Save video to media library
      await MediaLibrary.saveToLibraryAsync(videoUri);

      // Call API to upload video and data
      await uploadVideoAndQRData(videoUri, qrData, startedAt, endedAt);

      Alert.alert("Thành công", "Video đã được lưu và tải lên. Quay lại quét QR.");
      navigation.navigate("QRScanner");
    } catch (error) {
      console.error("Error in handleAccept:", error);
      Alert.alert("Lỗi", `Không thể lưu hoặc tải video lên: ${error.message}`);
    }
  };

  const handleReject = () => {
    Alert.alert("Đã từ chối", "Video đã bị xóa. Quay lại quét QR.");
    navigation.navigate("QRScanner");
  };

  async function uploadVideoAndQRData(videoUri, qrData, startedAt, endedAt) {
    try {
        const token = await AsyncStorage.getItem("token");
        
      const formData = new FormData();
      formData.append("video", {
        uri: videoUri,
        name: "video.mp4",
        type: "video/mp4",
      });
      formData.append("productId", qrData);
      formData.append("startedAt", startedAt);
      formData.append("endedAt", endedAt);

      const response = await fetch("http://192.168.0.3:7007/api/Video/Upload", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API call failed: ${errorText}`);
      }

      console.log("Upload successful:", await response.json());
    } catch (error) {
      console.error("API upload error:", error);
      throw error;
    }
  }

  return (
    <View style={styles.container}>
      <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
      />
      <View style={styles.controlsContainer}>
        <TouchableOpacity
          onPress={() => {
            if (isPlaying) {
              player.pause();
            } else {
              player.play();
            }
          }}
        >
          <Ionicons
            name={isPlaying ? "pause" : "play"}
            size={30}
            color="white"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.qrDataContainer}>
        <Text style={styles.qrDataLabel}>Product ID (QR):</Text>
        <Text
          style={styles.qrDataText}
          numberOfLines={3}
          ellipsizeMode="tail"
        >
          {qrData || "Không có dữ liệu"}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
          <Text style={styles.buttonText}>Chấp nhận</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rejectButton} onPress={handleReject}>
          <Text style={styles.buttonText}>Từ chối</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  video: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
  controlsContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
  qrDataContainer: {
    marginVertical: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  qrDataLabel: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  qrDataText: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
    maxWidth: "90%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  acceptButton: {
    backgroundColor: "#28a745",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  rejectButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});