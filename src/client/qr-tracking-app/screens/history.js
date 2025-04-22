import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IPV4_API } from '../../qr-tracking-app/ipv4'

const HistoryScreen = ({ navigation }) => {
    const [videos, setVideos] = useState([]);
    const [sortOrder, setSortOrder] = useState('desc'); // 'desc' for Newest, 'asc' for Oldest
    const [sortLabel, setSortLabel] = useState('Order by ⬇'); // Initial label with arrow
    const [pageNumber, setPageNumber] = useState(1);
    const pageSize = 20; // Number of videos per page

    // Fetch videos from API with pagination
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (!token) {
                    Alert.alert('Error', 'No authentication token found. Please log in again.');
                    return;
                }

                const response = await axios.get(`${IPV4_API}/Video/get-by-user`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                console.log('API Response:', response.data);

                // Log the raw video objects to inspect their structure
                const rawVideos = Array.isArray(response.data) ? response.data : response.data.data || [];
                console.log('Raw Videos:', rawVideos);

                // Filter out invalid items (those without an id or Id)
                let fetchedVideos = rawVideos.filter(video => video && (video.id || video.Id));
                if (fetchedVideos.length !== rawVideos.length) {
                    console.warn('Some videos were filtered out due to missing id/Id:', fetchedVideos);
                }

                // Sort videos based on UploadedAt (check both uploadedAt and UploadedAt)
                fetchedVideos.sort((a, b) => {
                    const dateA = new Date(a.createdAt);
                    const dateB = new Date(b.createdAt);
                    if (isNaN(dateA) || isNaN(dateB)) return 0;
                    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
                });

                setVideos(fetchedVideos);

                if (fetchedVideos.length === 0) {
                    Alert.alert('Info', 'No videos found.');
                }
            } catch (error) {
                console.error('Error fetching videos:', error);
                Alert.alert('Error', 'Failed to fetch videos. Please try again.');
            }
        };

        fetchVideos();
    }, [sortOrder, pageNumber]);

    // Handle video deletion
    const handleDelete = async (id) => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                Alert.alert('Error', 'No authentication token found. Please log in again.');
                return;
            }

            await axios.delete(`${IPV4_API}/Video/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const updatedVideos = videos.filter(video => (video.id || video.Id) !== id);
            console.log('Videos after deletion:', updatedVideos);
            setVideos(updatedVideos);
            Alert.alert('Success', 'Video deleted successfully.');
        } catch (error) {
            console.error('Error deleting video:', error);
            Alert.alert('Error', 'Failed to delete video. Please try again.');
        }
    };

    // Toggle sort order and label
    const toggleSortOrder = () => {
        if (sortLabel === 'Order by ⬇') {
            setSortOrder('desc');
            setSortLabel('Newest ⬇');
        } else if (sortOrder === 'desc') {
            setSortOrder('asc');
            setSortLabel('Oldest ⬆');
        } else {
            setSortOrder('desc');
            setSortLabel('Newest ⬇');
        }
    };

    // Calculate duration in minutes
    const calculateDuration = (startedAt, endedAt) => {
        if (!startedAt || !endedAt) return 'Unknown';
        const start = new Date(startedAt);
        const end = new Date(endedAt);
        if (isNaN(start) || isNaN(end)) return 'Unknown';
        const diffInMinutes = Number(((end - start) / (1000 * 60)).toFixed(2)); // Difference in minutes
        return `${diffInMinutes} minutes`;
    };

    // Render each video card
    const renderVideoCard = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('VideoDetail', { videoId: item.id || item.Id })}
        >
            <View style={styles.cardContent}>
                <View style={styles.iconPlaceholder}>
                    <Text style={styles.iconText}>📦</Text>
                </View>
                <View style={styles.cardInfo}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.productName}>{item.productName || 'Unknown Product'}</Text>
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => handleDelete(item.id || item.Id)}
                        >
                            <Text style={styles.deleteButtonText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.duration}>
                        {calculateDuration(item.startAt, item.endAt)}
                    </Text>
                    <View style={styles.cardFooter}>
                        <Text style={styles.uploader}>By {item.userName || 'Unknown'}</Text>
                        <Text style={styles.timestamp}>
                            {(item.createdAt) ? new Date(item.createdAt).toLocaleString() : 'Unknown Date'}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backButton}>⬅</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>History</Text>
                <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate('Setting')}>
                    <Ionicons name="settings-outline" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.sortButton} onPress={toggleSortOrder}>
                    <Text style={styles.sortButtonText}>{sortLabel}</Text>
                </TouchableOpacity>
            </View>

            {/* Video List */}
            <FlatList
                data={videos}
                renderItem={renderVideoCard}
                keyExtractor={(item) => (item.id || item.Id ? (item.id || item.Id).toString() : Math.random().toString())}
                contentContainerStyle={styles.list}
                ListEmptyComponent={<Text style={styles.emptyText}>No videos available.</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: 40,
    },
    header: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        backgroundColor: '#fff',
    },
    backButton: {
        fontSize: 24,
        color: '#000',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        flex: 1,
    },
    settingsButton: {
        position: 'absolute',
        top: 20,
        right: 16,
    },
    sortButton: {
        position: 'absolute',
        bottom: 10,
        right: 16,
        backgroundColor: '#fff',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    sortButtonText: {
        fontSize: 14,
        color: '#000',
    },
    list: {
        padding: 16,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconPlaceholder: {
        width: 70,
        height: 70,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    iconText: {
        fontSize: 32,
    },
    cardInfo: {
        flex: 1,
        justifyContent: 'space-between',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    duration: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
    qrCode: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
    cardFooter: {
        alignItems: 'flex-end',
        marginTop: 8,
    },
    uploader: {
        fontSize: 14,
        color: '#666',
    },
    timestamp: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
    deleteButton: {
        backgroundColor: '#ff4d4d',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#666',
    },
});

export default HistoryScreen;