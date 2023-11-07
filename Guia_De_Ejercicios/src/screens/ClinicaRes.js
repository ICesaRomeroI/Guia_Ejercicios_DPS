// PatientInfo.js
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';

const Paciente = ({ route }) => {
  const { nombre, apellido, genero, dui, nit, fechanac, telefonoMovil, telefonoCasa, correo, edad, etapa } = route.params;

  return (
    <View style={styles.container}>
      <Image source={require('../img/Back.jpg')} style={[styles.image, StyleSheet.absoluteFill]} />
      <ScrollView contentContainerStyle={{
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <BlurView intensity={100}>
          <View style={styles.form}>

            <Text style={styles.text}>Nombre: {nombre}</Text>
            <Text style={styles.text}>Apellido: {apellido}</Text>
            <Text style={styles.text}>Género: {genero}</Text>
            <Text style={styles.text}>DUI: {dui}</Text>
            <Text style={styles.text}>NIT: {nit}</Text>
            <Text style={styles.text}>Fecha de Nacimiento: {fechanac}</Text>
            <Text style={styles.text}>Teléfono Móvil: {telefonoMovil}</Text>
            <Text style={styles.text}>Teléfono de Casa: {telefonoCasa}</Text>
            <View style={styles.textContainer}>
              <Text style={styles.label}>Correo Electrónico:</Text>
              <Text style={styles.value}>{correo}</Text>
            </View>
            <Text style={styles.text}>Edad: {edad} años </Text>
            <Text style={styles.text}>Etapa: {etapa}</Text>

          </View>
        </BlurView>
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  form: {
    width: 'auto',
    height: 'auto',
    borderColor: 'cyan',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    alignItems: 'right',
    backgroundColor: '#ffffff60',
  },
  text: {
    fontSize: 20,
    fontWeight: '900',
    color: 'black',
    marginBottom: 10,
  },
  textContainer: {
    flexDirection: 'colum',
    alignItems: 'right',
    marginBottom: 15,
  },
  label: {
    fontSize: 20,
    fontWeight: '900',
    color: 'black',
    marginRight: 10,
  },
  value: {
    fontSize: 20,
    fontWeight: '900',
    color: 'black',
  },
});
export default Paciente;