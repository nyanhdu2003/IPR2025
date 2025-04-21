import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import Video from 'react-native-video';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VideoDetail = ({ route, navigation }) => {
    const { videoId } = route.params;
    const [videoData, setVideoData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVideoDetails = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (!token) {
                    Alert.alert('Error', 'No authentication token found. Please log in again.');
                    return;
                }

                const response = await axios.get(`https://localhost:7007/api/Video/${videoId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                console.log('Video Detail Response:', response.data);

                const video = response.data.data || response.data;
                setVideoData(video);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching video details:', error);
                Alert.alert('Error', 'Failed to fetch video details. Please try again.');
                setLoading(false);
            }
        };

        fetchVideoDetails();
    }, [videoId]);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#fff" />
            </View>
        );
    }

    if (!videoData) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Video not found.</Text>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.backButtonText}>Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Video Player */}
            <Video
                source={{ uri: videoData.filePath || videoData.FilePath }}
                style={styles.video}
                controls
                resizeMode="contain"
                repeat
                paused={false} // Đảm bảo video tự động phát
                onError={(error) => {
                    console.error('Video playback error:', error);
                    Alert.alert('Error', 'Failed to play video. Please try again.');
                }}
            />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backButton}>⬅</Text>
                </TouchableOpacity>
            </View>

            {/* Video Details */}
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{videoData.product?.name || videoData.Product?.Name || 'Unknown Product'}</Text>
                <Text style={styles.detailText}>
                    QR Code: {videoData.product?.qrCode || videoData.Product?.QrCode || 'Unknown QR'}
                </Text>
                <Text style={styles.detailText}>
                    Uploaded By: {videoData.user?.fullName || videoData.user?.username || videoData.User?.FullName || videoData.User?.Username || 'Unknown'}
                </Text>
                <Text style={styles.detailText}>
                    Uploaded At: {(videoData.uploadedAt || videoData.UploadedAt) ? new Date(videoData.uploadedAt || videoData.UploadedAt).toLocaleString() : 'Unknown Date'}
                </Text>
                <Text style={styles.detailText}>
                    Duration: {calculateDuration(videoData.startedAt || videoData.StartedAt, videoData.endedAt || videoData.EndedAt)}
                </Text>
            </View>
        </View>
    );
};

const calculateDuration = (startedAt, endedAt) => {
    if (!startedAt || !endedAt) return 'Unknown';
    const start = new Date(startedAt);
    const end = new Date(endedAt);
    if (isNaN(start) || isNaN(end)) return 'Unknown';
    const diffInMinutes = Math.round((end - start) / (1000 * 60));
    return `${diffInMinutes} minutes`;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    video: {
        width: '100%',
        height: '100%', // Video chiếm toàn bộ màn hình
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 30,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1, // Đảm bảo header nằm trên video
    },
    backButton: {
        fontSize: 24,
        color: '#fff',
    },
    detailsContainer: {
        position: 'absolute',
        top: 16, // Đặt ở góc trên
        right: 16, // Đặt sát bên phải
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 10,
        borderRadius: 8,
        zIndex: 1, // Đảm bảo detailsContainer nằm trên video
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
    },
    detailText: {
        fontSize: 14,
        color: '#fff',
        marginBottom: 5,
    },
    errorText: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        marginTop: 20,
    },
    backButtonText: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
    },
});

export default VideoDetail;