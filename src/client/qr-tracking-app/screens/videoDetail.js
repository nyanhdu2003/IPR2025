import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Video } from 'expo-av';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IPV4_API } from '../../qr-tracking-app/ipv4';

const VideoDetail = ({ route, navigation }) => {
    const { videoId } = route.params;
    const [videoData, setVideoData] = useState(null);
    const [loading, setLoading] = useState(true);
    const videoRef = useRef(null);

    useEffect(() => {
        const fetchVideoDetails = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (!token) {
                    Alert.alert('Error', 'No authentication token found. Please log in again.');
                    return;
                }

                const response = await axios.get(`${IPV4_API}/Video/${videoId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

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
                ref={videoRef}
                source={{ uri: videoData.filePath }}
                style={styles.video}
                resizeMode="contain"
                shouldPlay
                useNativeControls
                isLooping
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
                <Text style={styles.title}>
                    {videoData.productName || 'Unknown Product'}
                </Text>
                <Text style={styles.detailText}>
                    Uploaded By: {videoData.userName || 'Unknown'}
                </Text>
                <Text style={styles.detailText}>
                    Uploaded At: {videoData.createdAt ? new Date(videoData.createdAt).toLocaleString() : 'Unknown Date'}
                </Text>
                <Text style={styles.detailText}>
                    Duration: {videoData.duration ? `${videoData.duration} minutes` : 'Unknown'}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    video: {
        width: '100%',
        height: '100%',
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
        zIndex: 1,
    },
    backButton: {
        fontSize: 24,
        color: '#fff',
    },
    detailsContainer: {
        position: 'absolute',
        top: 16,
        right: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 10,
        borderRadius: 8,
        zIndex: 1,
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