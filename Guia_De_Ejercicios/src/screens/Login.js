import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../firebase-config';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';


const Login = () => {

  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);
  const navigation = useNavigation();

  const handleCreateAcount = () => {
    createUserWithEmailAndPassword(auth, correo, password)
      .then((userCredential) => {
        console.log('Cuenta Creada');
        Alert.alert('Cuenta Creada');
        const user = userCredential.user;
        console.log(user);
        setCorreo('');
        setPassword('');
      })
      .catch(error => {
        console.log(error);
        const errorMessage = obtenerMensajeDeErrorEnEspanol(error);
        Alert.alert(errorMessage);
        setCorreo('');
        setPassword('');
      });
  }

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, correo, password)
      .then((userCredential) => {
        console.log('Logueado');
        Alert.alert('Bienvenido');

        const user = userCredential.user;
        console.log(user);

        // Navega a la pantalla de Clinica
        navigation.navigate('HomeScreen');
        setCorreo('');
        setPassword('');
      })
      .catch(error => {
        console.log(error);
        const errorMessage = obtenerMensajeDeErrorEnEspanol(error);
        Alert.alert(errorMessage);
        setCorreo('');
        setPassword('');
      });
  }

  function obtenerMensajeDeErrorEnEspanol(error) {
    // Mapea el código de error a los mensajes de error en español
    const mensajesDeErrorEnEspanol = {
      'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.',
      'auth/email-already-in-use': 'El correo ingresado ya se encuentra registrado',
      'auth/invalid-login-credentials': 'Usuario o contraseña incorrecta',
      'auth/invalid-email': 'Correo Incorrecto',
      'auth/missing-password': 'Falta contraseña',
    };

    // Verifica si hay un mensaje de error en español para el código de error dado
    if (mensajesDeErrorEnEspanol[error.code]) {
      return mensajesDeErrorEnEspanol[error.code];
    }

    // Si no se encuentra un mensaje personalizado, devuelve el mensaje de error predeterminado en inglés
    return error.message;
  }

  return (
    <View style={styles.container}>
      <Image source={require('../img/Back.jpg')} style={[styles.image, StyleSheet.absoluteFill]} />
      <ScrollView contentContainerStyle={{
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <BlurView intensity={80}>
          <View style={styles.login}>
            <Image source={require('../img/user.png')} style={styles.imagePerfil} />
            <View>
              <Text style={styles.text}>Correo</Text>
              <TextInput onChangeText={(text) => setCorreo(text)} style={styles.input} placeholder='Ingrese su Correo' value={correo}></TextInput>
            </View>
            <View>
              <Text style={styles.text}>Contraseña</Text>
              <TextInput onChangeText={(text) => setPassword(text)} style={styles.input} placeholder='Ingrese su Contraseña' secureTextEntry={true} value={password}></TextInput>
            </View>
            <TouchableOpacity onPress={handleLogin} style={[styles.button, { backgroundColor: '#00CFEB90' }]}>
              <Icon name="user" size={15} color="white" />
              <Text style={styles.textButton}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCreateAcount} style={[styles.button, { backgroundColor: '#6792F090' }]}>
              <Icon name="user-plus" size={15} color="white" />
              <Text style={styles.textButton}>Crear Cuenta</Text>
            </TouchableOpacity>
          </View>
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
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  login: {
    width: 350,
    height: 500,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  imagePerfil: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#fff',
    borderWidth: 2,
    marginVertical: 30,
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
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#ffffff90',
    marginBottom: 20,
  },
  textButton: {
    fontSize: 17,
    fontWeight: '400',
    color: 'white',
    marginLeft: 10,
  },
  button: {
    width: 250,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderColor: 'white',
    borderWidth: 1,
    flexDirection: 'row',
  }
});

export default Login;