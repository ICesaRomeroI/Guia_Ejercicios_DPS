import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import Login from './src/screens/Login';
import Clinica from './src/screens/Clinica';
import ConsultandoIP from './src/screens/ConsultandoIP';
import API_REST from './src/screens/API_REST';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Clinica" component={Clinica} />
        <Stack.Screen name="ConsultandoIP" component={ConsultandoIP} />
        <Stack.Screen name="API_REST" component={API_REST} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image:{
    width:'100%',
    height: '100%',
    resizeMode: 'cover',
  },
  login:{
    width:350,
    height: 500,
    borderColor:'#fff',
    borderWidth:2,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  imagePerfil:{
    width:100,
    height:100,
    borderRadius: 50,
    borderColor:'#fff',
    borderWidth:2,
    marginVertical: 30,
  },
  text:{
    fontSize: 17,
    fontWeight: '400',
    color: 'white',
  },
  input:{
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
  textButton:{
    fontSize:17,
    fontWeight: '400',
    color:'white',
  },
  button:{
    width: 250,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderColor: 'white',
    borderWidth: 1,
  }
});
