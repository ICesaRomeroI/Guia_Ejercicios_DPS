import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  Button,
  Image,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { BlurView } from 'expo-blur';

const RegistroEquiposScreen = () => {
  const [nombreEquipo, setNombreEquipo] = useState("");
  const [facultad, setFacultad] = useState("");
  const [anoCiclo, setAnoCiclo] = useState("");
  const [torneo, setTorneo] = useState("");

  // Datos referentes a los integrantes del equipo
  const [carnet, setCarnet] = useState("");
  const [nombreApellido, setNombreApellido] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [genero, setGenero] = useState("");
  const [posicion, setPosicion] = useState("");
  const [numeroCamisa, setNumeroCamisa] = useState("");

  const handleRegistroEquipo = () => {
    // Lógica para registrar el equipo y sus integrantes
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../img/Back.jpg")}
        style={[styles.image, StyleSheet.absoluteFill]}
      />
      <ScrollView>
        <BlurView intensity={90}>
          <View style={styles.form}>
            <Text style={styles.text}>Datos generales del equipo:</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre del equipo"
              value={nombreEquipo}
              onChangeText={setNombreEquipo}
            />
            <TextInput
              style={styles.input}
              placeholder="Facultad"
              value={facultad}
              onChangeText={setFacultad}
            />
            <TextInput
              style={styles.input}
              placeholder="Año y ciclo de inscripción"
              value={anoCiclo}
              onChangeText={setAnoCiclo}
            />
            <Text style={styles.text}>Torneo:</Text>
            <RNPickerSelect
              style={styles.input}
              onValueChange={(value) => setTorneo(value)}
              items={[
                { label: "Masculino", value: "masculino" },
                { label: "Femenino", value: "femenino" },
              ]}
              placeholder={{ label: "Seleccione el género", value: null }}
            />

            {/* Datos referentes a los integrantes del equipo */}
            <Text style={styles.text}>Datos de los jugadores:</Text>

            <View>
              <TextInput
                style={styles.input}
                placeholder="Carnet del estudiante"
                value={carnet}
                onChangeText={setCarnet}
              />
              <TextInput
                style={styles.input}
                placeholder="Nombres y Apellidos"
                value={nombreApellido}
                onChangeText={setNombreApellido}
              />
              <TextInput
                style={styles.input}
                placeholder="Fecha de nacimiento"
                value={fechaNacimiento}
                onChangeText={setFechaNacimiento}
              />
              <RNPickerSelect
                style={styles.input}
                onValueChange={(value) => setGenero(value)}
                items={[
                  { label: "Masculino", value: "masculino" },
                  { label: "Femenino", value: "femenino" },
                ]}
                placeholder={{ label: "Seleccione el género", value: null }}
              />
              <TextInput
                style={styles.input}
                placeholder="Posición en el equipo"
                value={posicion}
                onChangeText={setPosicion}
              />
              <TextInput
                style={styles.input}
                placeholder="Número de camisa"
                value={numeroCamisa}
                onChangeText={setNumeroCamisa}
              />
            </View>

            <Button style={styles.textButton} title="Registrar Equipo" onPress={handleRegistroEquipo} />
          </View>
        </BlurView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    fontSize: 14,
    color: "red",
    marginBottom: 5,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  form: {
    width: 340,
    height: 800,
    borderColor: "cyan",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    marginTop: 10,
  },
  text: {
    fontSize: 17,
    fontWeight: "400",
    color: "white",
  },
  input: {
    width: 250,
    height: 35,
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#ffffff90",
    marginBottom: 10,
  },
  textButton: {
    fontSize: 17,
    fontWeight: "400",
    color: "white",
    marginLeft: 10,
  },
  button: {
    width: 150,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    borderColor: "cyan",
    borderWidth: 1,
    flexDirection: "row",
  },
  buttonF: {
    width: 300,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    borderColor: "cyan",
    borderWidth: 1,
    flexDirection: "row",
  },
});

export default RegistroEquiposScreen;
