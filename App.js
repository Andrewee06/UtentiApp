import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default function App() {
    const data = []; // lista vuota per ora

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista utenti</Text>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>{item.name}</Text>
                    </View>
                )}
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
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});
