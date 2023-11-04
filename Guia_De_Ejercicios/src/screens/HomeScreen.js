import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function HomeScreen() {
    const navigation = useNavigation();
  return (

    <View style={styles.container}>
     <Image source={require('../img/Back.jpg')} style={[styles.image, StyleSheet.absoluteFill]}/>
     <ScrollView contentContainerStyle ={{
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
     }}>
         <BlurView intensity={90}>
      <Text style={{ color: 'black', fontSize: 35, fontWeight: '900', textAlign: 'center', marginBottom: 10}}>
        Guia de Ejercicios
      </Text>

      <TouchableOpacity
        style={styles.botones}
        onPress={() => navigation.navigate('Clinica')}>
            <Icon name="hospital-o" size={25} color="white" />
        <Text style={styles.texto}>Clínica</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botones}
        onPress={() => navigation.navigate('ConsultandoIP')}
        underlayColor="#abc"
        >
            <Icon name="server" size={25} color="white" />
        <Text style={styles.texto}>Consultando IP</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botones}
        onPress={() => navigation.navigate('API_REST')}
        underlayColor="#abc" 
      >
        <Icon name="soccer-ball-o" size={25} color="white" />
        <Text style={styles.texto}>API REST</Text>
      </TouchableOpacity>
    </BlurView>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  botones: {
    height: 50,
    width: 300,
    borderRadius: 10,
    backgroundColor: 'cyan',
    marginLeft: 50,
    marginRight: 50,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row', 
  },
  texto: {
    color: 'black',
    fontSize: 30,
    marginLeft: 10,
  },
  image:{
    width:'100%',
    height: '100%',
    resizeMode: 'cover',
  },
  text:{
    fontSize: 17,
    fontWeight: '400',
    color: 'white',
  },
});