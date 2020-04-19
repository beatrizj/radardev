import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import { MaterialIcons } from '@expo/vector-icons'

import api from '../services/api'

function Main({ navigation }) {
    const [devs, setDevs] = useState([])
    const [currentRegion, setCurrentRegion] = useState(null)
    const [techs, setTechs] = useState('')

    useEffect(() => {  //abre o mapa na posição atual do usuário
        async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync() //mostra uma janela para o usuario autorizar, retorna um array de informações

            if (granted) { //o granted informa se o usuario deu autorização ou não (true ou false)
                const { coords } = await getCurrentPositionAsync({ //coords são as cordenadas
                    enableHighAccuracy: true
                })

                const { latitude, longitude } = coords

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,  //delta são calculos navais para obter a localização no mapa
                    longitudeDelta: 0.04
                })
            }
        }

        loadInitialPosition()
    }, [])

    async function loadDevs() {
        const { latitude, longitude } = currentRegion

        const res = await api.get('/search', {
            params: {
                latitude,
                longitude,
                techs
            }
        })

        setDevs(res.data.devs)
    }

    function handleRegionChanged(region) {
        setCurrentRegion(region)
    }

    if (!currentRegion) {  //se não tiver a informação do usuário (retorno do useEffect) o mapa não carrega
        return null
    }

    return (
        <>
            <MapView onRegionChangeComplete={handleRegionChanged} initialRegion={currentRegion} style={styles.map}>
                {devs.map(dev => (
                    <Marker key={dev._id} coordinate={{ latitude: dev.location.coordinates[1], longitude: dev.location.coordinates[0]}}>
                    <Image style={styles.avatar} source={{ uri: dev.avatar_url }} />

                    <Callout onPress={() => {navigation.navigate('Profile', { github_username: dev.github_username })}}>
                        <View style={styles.callout}>
                            <Text style={styles.devName}>{dev.name}</Text>
                            <Text style={styles.devBio}>{dev.bio}</Text>
                            <Text style={styles.devTechs}>{dev.techs.join(', ')}e</Text>
                        </View>
                    </Callout>
                </Marker>
                ))}
            </MapView>

            <View style={styles.searchForm}>
                <TextInput style={styles.searchInput} placeholder='Buscar devs por techs' placeholderTextColor='#999999'  autoCapitalize='words' autoCorrect={false} value={techs} onChangeText={setTechs} />
                <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
                    <MaterialIcons name='my-location' size={20} color='#ffffff' />
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },

    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#ffffff'
    },

    callout: {
        width: 260
    },

    devName: {
       fontWeight: 'bold',
       fontSize: 16
    },

    devBio: {
        color: '#666666',
        marginTop: 5
    },

    devTechs: {
        marginTop: 5
    },

    searchForm: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row'
    },

    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#ffffff',
        color: '#333333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        elevation: 2
    },

    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: '#8e4dff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
        elevation: 3
    }
})

export default Main