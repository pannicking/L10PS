import React, { useState, useEffect } from 'react';
import { FlatList, StatusBar, Text, TextInput, View, Image, StyleSheet } from 'react-native';
import cinnabonLogo from './img/cinnabonlogo.png';  // Import local image

let originalData = [];

const App = () => {
    const [mydata, setMyData] = useState([]);

    useEffect(() => {
        fetch("https://mysafeinfo.com/api/data?list=cinnabon&format=json&case=default")
            .then((response) => response.json())
            .then((myJson) => {
                if (originalData.length < 1) {
                    setMyData(myJson);
                    originalData = myJson;
                }
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const FilterData = (text) => {
        if (text !== '') {
            let myFilteredData = originalData.filter((item) =>
                item.Location.toLowerCase().includes(text.toLowerCase())
            );
            setMyData(myFilteredData);
        } else {
            setMyData(originalData);
        }
    };

    const renderItem = ({ item }) => {
        return (
            <View style={styles.itemContainer}>
                <Text style={styles.locationText}>{item.Location}</Text>
                <Text style={styles.detailsText}>{item.City}, {item.State}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <Image source={cinnabonLogo} style={styles.logo} resizeMode="contain" />
            <Text style={styles.header}>Cinnabon Locations</Text>
            <TextInput
                style={styles.searchInput}
                placeholder="Search by location..."
                placeholderTextColor="#aaa"
                onChangeText={(text) => FilterData(text)}
            />
            <FlatList
                data={mydata}
                renderItem={renderItem}
                keyExtractor={(item) => item.ID.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fdf6ec',
        padding: 20,
    },
    logo: {
        width: '100%',
        height: 100,

    },
    header: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#8B4513',
        textAlign: 'center',
        marginBottom: 20,
    },
    searchInput: {
        borderWidth: 1,
        borderColor: '#8B4513',
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#fff',
        color: '#333',
        marginBottom: 20,
    },
    itemContainer: {
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        backgroundColor: '#ffdab9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    locationText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#8B4513',
    },
    detailsText: {
        fontSize: 16,
        color: '#654321',
        marginTop: 5,
    },
});

export default App;
