import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Image } from 'react-native';

const API_URL = 'https://683953156561b8d882afe348.mockapi.io/utenti';

export default function App() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch(API_URL);
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Caricamento dati...</Text>
            </View>
        );
    }

    const renderItem = ({ item }) => {
        const formattedDate = new Date(item.createdAt).toLocaleDateString();
        return (
            <View style={styles.item}>
                <Image source={{ uri: item.img }} style={styles.avatar} />
                <View style={styles.info}>
                    <Text style={[styles.name, { color: 'black' }]}>{item.nome} {item.cognome}</Text>
                    <Text style={styles.date}>Creato il: {formattedDate}</Text>
                </View>
            </View>
        );
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista utenti</Text>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                ListEmptyComponent={<Text>Nessun dato disponibile</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    item: {
        flexDirection: 'row',
        padding: 10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        alignItems: 'center',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
        backgroundColor: '#ccc',
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
    },
    date: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
