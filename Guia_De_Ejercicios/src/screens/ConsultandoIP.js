import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SvgUri } from 'react-native-svg';

const API_URL = 'http://ipwho.is/';

const ConsultandoIP = () => {
    const [ip, setIp] = useState('');
    const [data, setData] = useState({});
    const [savedData, setSavedData] = useState([]);
    const [org, setOrg] = useState("");
    const [isp, setIsp] = useState("");
    const [domain, setDomain] = useState("");

    useEffect(() => {
        // Cargar datos almacenados en AsyncStorage al inicio
        loadSavedData();
    }, []);

    const loadSavedData = async () => {
        try {
            const saved = await AsyncStorage.getItem('savedData');
            if (saved) {
                setSavedData(JSON.parse(saved));
            }
        } catch (error) {
            console.error('Error al cargar datos almacenados:', error);
        }
    };

    const saveData = async (newData) => {
        try {
            const updatedData = [...savedData, { ...newData, ip: ip }];
            await AsyncStorage.setItem('savedData', JSON.stringify(updatedData));
            setSavedData(updatedData);
        } catch (error) {
            console.error('Error al guardar datos:', error);
        }
    };

    const clearSavedData = async () => {
        try {
            await AsyncStorage.removeItem('savedData');
            setSavedData([]);
        } catch (error) {
            console.error('Error al borrar datos:', error);
        }
    };

    const fetchData = async () => {

        // Validar el formato de la dirección IP
        const ipRegex = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
        if (!ipRegex.test(ip)) {
            alert('Ingrese una dirección IP válida.');
            return;
        }

        try {
            const response = await fetch(`${API_URL}${ip}`);
            if (response.ok) {
                const responseData = await response.json();

                // Verificar si responseData.connection existe antes de acceder a sus propiedades
                const updatedData = {
                    ip: ip,
                    type: responseData.type || '',
                    continent: responseData.continent || '',
                    country: responseData.country || '',
                    country_code: responseData.country_code || '',
                    region: responseData.region || '',
                    city: responseData.city || '',
                    capital: responseData.capital || '',
                    org: responseData.connection ? (responseData.connection.org || '') : 'No disponible',
                    isp: responseData.connection ? (responseData.connection.isp || '') : 'No disponible',
                    domain: responseData.connection ? (responseData.connection.domain || '') : 'No disponible',
                    flagImageUrl: `http://cdn.ipwhois.io/flags/${responseData.country_code.toLowerCase()}.svg`,
                };

                // Guardar la hora actual en el objeto de datos
                if (responseData.timezone && responseData.timezone.current_time) {
                    updatedData.horaAc = responseData.timezone.current_time;

                    // Guardar la hora actual en AsyncStorage
                    await AsyncStorage.setItem('horaAc', responseData.timezone.current_time);
                } else {
                    updatedData.horaAc = "No disponible";
                }

                // Establecer estados para org, isp, y domain
                setOrg(responseData.connection && responseData.connection.org ? responseData.connection.org : 'No disponible');
                setIsp(responseData.connection && responseData.connection.isp ? responseData.connection.isp : 'No disponible');
                setDomain(responseData.connection && responseData.connection.domain ? responseData.connection.domain : 'No disponible');

                // Guardar los datos actualizados en AsyncStorage
                saveData(updatedData);

                // Establecer el estado de los datos
                setData(updatedData);
            } else {
                console.error('Error al obtener datos:', response.status);
            }
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../img/Back.jpg')} style={[styles.image, StyleSheet.absoluteFill]} />
            <View style={{ flex: 1, padding: 20 }}>
                <View style={styles.centeredContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Ingrese una dirección IP"
                        value={ip}
                        onChangeText={(text) => setIp(text)}
                    />
                    <TouchableOpacity
                        onPress={fetchData}
                        style={[
                            styles.button,
                            { backgroundColor: ip ? '#6792F090' : 'gray', marginRight: 10 }, // Cambio de color si la dirección IP está presente
                        ]}
                        disabled={!ip} // Deshabilitar el botón si la dirección IP está vacía
                    >
                        <Icon name="search" size={15} color="white" />
                        <Text style={styles.textButton}>Buscar</Text>
                    </TouchableOpacity>
                </View>


                {data && Object.keys(data).length > 0 && (
                    <ScrollView>

                        <BlurView intensity={90}>
                            <View style={styles.form}>
                                <Text style={styles.text}>Tipo de IP: {data.type}</Text>
                                <Text style={styles.text}>Continente: {data.continent}</Text>
                                <Text style={styles.text}>País: {data.country}</Text>
                                <Text style={styles.text}>Código de País: {data.country_code}</Text>
                                <Text style={styles.text}>Región: {data.region}</Text>
                                <Text style={styles.text}>Ciudad: {data.city}</Text>
                                <Text style={styles.text}>Capital: {data.capital}</Text>
                                <View style={{ width: 100, height: 100, marginBottom: 15, marginTop: 15 }}>
                                    <SvgUri

                                        width={200}
                                        height={200}
                                        preserveAspectRatio='none'
                                        viewBox='0 0 900 1000'
                                        uri={`http://cdn.ipwhois.io/flags/${data.country_code.toLowerCase()}.svg`}
                                    />
                                </View>
                                <Text style={styles.text}>Fecha actual: {data.horaAc}</Text>
                                <Text style={[styles.text, { textAlign: 'center', marginTop: '10%' }]}>Datos de conexión:</Text>
                                <Text style={styles.text}>-------------------------------------</Text>
                                <Text style={styles.text}>Organización: {org}</Text>
                                <Text style={styles.text}>-------------------------------------</Text>
                                <Text style={styles.text}>ISP: {isp}</Text>
                                <Text style={styles.text}>-------------------------------------</Text>
                                <Text style={styles.text}>Dominio: {domain}</Text>

                            </View>
                        </BlurView>
                    </ScrollView>
                )}

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={clearSavedData} style={[styles.buttonB, { backgroundColor: 'rgba(255, 99, 71, 0.9)' }]}>
                        <Icon name="eraser" size={18} color="white" />
                        <Text style={styles.textButtonB}>Borrar todas las consultas</Text>
                    </TouchableOpacity>
                </View>

                {savedData.length > 0 && (
                    <ScrollView>
                        <BlurView intensity={90}>
                            {savedData.map((saved, index) => (
                                <View key={index} style={styles.form}>
                                    <Text style={[styles.text, { textAlign: 'center' }]}>Consulta {index + 1}</Text>
                                    <Text style={styles.text}>IP: {saved.ip}</Text>
                                    <Text style={styles.text}>Tipo de IP: {saved.type}</Text>
                                    <Text style={styles.text}>Continente: {saved.continent}</Text>
                                    <Text style={styles.text}>País: {saved.country}</Text>
                                    <Text style={styles.text}>Código de País: {saved.country_code}</Text>
                                    <Text style={styles.text}>Región: {saved.region}</Text>
                                    <Text style={styles.text}>Ciudad: {saved.city}</Text>
                                    <View style={{ width: 100, height: 100, marginBottom: 15, marginTop: 15 }}>
                                        <SvgUri
                                            width={200}
                                            height={200}
                                            preserveAspectRatio='none'
                                            viewBox='0 0 900 1000'
                                            uri={saved.flagImageUrl} 
                                        />
                                    </View>
                                    <Text style={styles.text}>Fecha actual: {saved.horaAc ? saved.horaAc : 'No disponible'}</Text>
                                    <Text style={[styles.text, { textAlign: 'center', marginTop: '10%' }]}>Datos de conexión:</Text>
                                    <Text style={styles.text}>-------------------------------------</Text>
                                    <Text style={styles.text}>Organización: {saved.org ? saved.org : 'No disponible'}</Text>
                                    <Text style={styles.text}>-------------------------------------</Text>
                                    <Text style={styles.text}>ISP: {saved.isp ? saved.isp : 'No disponible'}</Text>
                                    <Text style={styles.text}>-------------------------------------</Text>
                                    <Text style={styles.text}>Dominio: {saved.domain ? saved.domain : 'No disponible'}</Text>
                                </View>
                            ))}
                        </BlurView>
                    </ScrollView>
                )}
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorText: {
        fontSize: 14,
        color: 'red',
        marginBottom: 5,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    form: {
        width: 340,
        height: 'auto',
        borderColor: 'cyan',
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        alignItems: 'right',
        marginTop: 10,
    },
    text: {
        fontSize: 17,
        fontWeight: '400',
        color: 'white',
    },
    input: {
        width: 250,
        height: 40,
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 10,
        marginVertical: 5,
        backgroundColor: '#ffffff90',
        marginBottom: 10,
        fontSize: 20,
        paddingHorizontal: 10,
    },
    textButton: {
        fontSize: 17,
        fontWeight: '400',
        color: 'white',
        marginLeft: 10,
    },
    textButtonB: {
        fontSize: 20,
        fontWeight: '900',
        color: 'white',
        marginLeft: 10,
    },
    button: {
        width: 150,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        borderColor: 'cyan',
        borderWidth: 1,
        flexDirection: 'row',
    },
    buttonB: {
        width: 300,
        height: 'auto',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        borderColor: 'cyan',
        borderWidth: 1,
        flexDirection: 'row',
    },
    centeredContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        marginTop: 10,
        alignSelf: 'center',
    },
});
export default ConsultandoIP;
