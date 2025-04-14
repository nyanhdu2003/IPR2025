import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HistoryScreen = ({ navigation }) => {
    const [videos, setVideos] = useState([]);
    const [sortOrder, setSortOrder] = useState('desc'); // 'desc' for Newest, 'asc' for Oldest
    const [sortLabel, setSortLabel] = useState('Order by'); // Initial label

    // Dummy data with uploader field
    const dummyVideos = [
        { id: '1', productName: 'Product 1', duration: '10 minutes', qrCode: 'HUYQ', timestamp: '2025-04-10T14:00:00', uploader: 'User A' },
        { id: '2', productName: 'Product 2', duration: '15 minutes', qrCode: 'HUYQ', timestamp: '2025-04-09T10:30:00', uploader: 'User B' },
        { id: '3', productName: 'Product 3', duration: '8 minutes', qrCode: 'HUYQ', timestamp: '2025-04-08T16:45:00', uploader: 'User A' },
        { id: '4', productName: 'Product 4', duration: '12 minutes', qrCode: 'HUYQ', timestamp: '2025-04-07T09:15:00', uploader: 'User C' },
    ];

    // Sorting logic
    useEffect(() => {
        let sortedVideos = [...dummyVideos];

        sortedVideos.sort((a, b) => {
            const dateA = new Date(a.timestamp);
            const dateB = new Date(b.timestamp);
            if (isNaN(dateA) || isNaN(dateB)) return 0;
            return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
        });

        setVideos(sortedVideos);
    }, [sortOrder]);

    // Handle video deletion (simulated)
    const handleDelete = (id) => {
        setVideos(videos.filter(video => video.id !== id));
        Alert.alert('Success', 'Video deleted successfully (simulated).');
    };

    // Toggle sort order and label
    const toggleSortOrder = () => {
        if (sortLabel === 'Order by') {
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

    // Render each video card
    const renderVideoCard = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('VideoDetail', { videoId: item.id })}
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
                            onPress={() => handleDelete(item.id)}
                        >
                            <Text style={styles.deleteButtonText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.duration}>{item.duration || '10 minutes'}</Text>
                    <Text style={styles.qrCode}>{item.qrCode || 'Unknown QR'}</Text>
                    <View style={styles.cardFooter}>
                        <Text style={styles.uploader}>By {item.uploader || 'Unknown'}</Text>
                        <Text style={styles.timestamp}>
                            {new Date(item.timestamp).toLocaleString() || 'Unknown Date'}
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
                <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                    <Ionicons name="settings-outline" size={24} color="#000" style={styles.settingsIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.sortButton} onPress={toggleSortOrder}>
                    <Text style={styles.sortButtonText}>{sortLabel}</Text>
                </TouchableOpacity>
            </View>

            {/* Video List */}
            <FlatList
                data={videos}
                renderItem={renderVideoCard}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.list}
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
        paddingVertical: 30, // Increased padding to make header taller
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
    settingsIcon: {
        position: 'absolute',
        top: -2, // Dịch lên trên
        right: 5, // Dịch sang phải
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
});

export default HistoryScreen;