import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, ScrollView, Image, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { Picker } from '@react-native-picker/picker';
import { useFormik } from 'formik';
import * as yup from 'yup';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';

const Clinica = ({ navigation }) => {
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date()); 


    const formatDate = (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
    };


    // Función para manejar los cambios en el componente DateTimePicker
    const handleDateChange = (event, selectedDate) => {
        if (event.type === 'set') {
            setShowDatePicker(false);
            setSelectedDate(selectedDate);
            setDate(selectedDate);
            formik.setFieldValue('fechanac', formatDate(selectedDate));
        }
    };
    const formik = useFormik({
        initialValues: {
            nombre: '',
            apellido: '',
            genero: 'Masculino',
            dui: '',
            nit: '',
            fechanac: '',
            direccion: '',
            telefonoMovil: '',
            telefonoCasa: '',
            correo: '',
        },
        validationSchema: yup.object({
            nombre: yup.string().matches(/^[a-zA-Z ]+$/, 'Nombre inválido').required('Campo requerido'),
            apellido: yup.string().matches(/^[a-zA-Z ]+$/, 'Apellido inválido').required('Campo requerido'),
            dui: yup.string().matches(/^\d{8}-\d$/, 'DUI inválido').required('Campo requerido'),
            nit: yup.string().matches(/^\d{4}-\d{6}-\d{3}-\d$/, 'NIT inválido').required('Campo requerido'),
            telefonoMovil: yup.string().matches(/^[67]\d{7}$/, 'Número de teléfono móvil inválido').required('Campo requerido'),
            telefonoCasa: yup.string().matches(/^2\d{7}$/, 'Número de teléfono de casa inválido').required('Campo requerido'),
            correo: yup.string().matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/, 'Correo electrónico inválido').required('Campo requerido'),
            fechanac: yup
                .date()
                .max(new Date(), 'La fecha no puede ser mayor o igual a la actual')
                .required('Campo requerido')
                .transform((value, originalValue) => {
                    const dateParts = originalValue.split('/');
                    if (dateParts.length === 3) {
                        const year = parseInt(dateParts[2], 10);
                        const month = parseInt(dateParts[1], 10) - 1;
                        const day = parseInt(dateParts[0], 10) + 2;
                        return new Date(year, month, day);
                    }
                    return new Date(originalValue);
                }),
        }),
        onSubmit: (values, { resetForm }) => {
            // Calcular la edad a partir de la fecha de nacimiento
            const nacimiento = new Date(date);
            const hoy = new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate()));
            const edad = hoy.getFullYear() - nacimiento.getFullYear();

            // Lógica para determinar la etapa
            let etapa = '';
            if (edad >= 0 && edad <= 5) {
                etapa = 'Primera infancia';
            } else if (edad <= 11) {
                etapa = 'Infancia';
            } else if (edad <= 18) {
                etapa = 'Adolescencia';
            } else if (edad <= 26) {
                etapa = 'Juventud';
            } else if (edad <= 59) {
                etapa = 'Adultez';
            } else {
                etapa = 'Persona mayor';
            }

            // Verificar si la fecha de nacimiento es válida
            if (formik.errors.fechanac) {
                Alert.alert('Error', formik.errors.fechanac);
            } else {
                // Enviar datos a la segunda pantalla
                navigation.navigate('Paciente', {
                    ...values,
                    edad,
                    etapa,
                });
            }

            // Reiniciar el formulario
            resetForm();
        },
    });

    return (
        <View style={styles.container}>
            <Image source={require('../img/Back.jpg')} style={[styles.image, StyleSheet.absoluteFill]} />
            <ScrollView>
                <BlurView intensity={90}>
                    <View style={styles.form}>
                        <Text style={styles.text}>Nombre:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={formik.handleChange('nombre')}
                            onBlur={formik.handleBlur('nombre')}
                            value={formik.values.nombre}
                        />
                        {formik.touched.nombre && formik.errors.nombre && (
                            <Text style={styles.errorText}>{formik.errors.nombre}</Text>
                        )}

                        <Text style={styles.text}>Apellido:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={formik.handleChange('apellido')}
                            onBlur={formik.handleBlur('apellido')}
                            value={formik.values.apellido}
                        />
                        {formik.touched.apellido && formik.errors.apellido && (
                            <Text style={styles.errorText}>{formik.errors.apellido}</Text>
                        )}

                        <Text style={styles.text}>Género:</Text>
                        <Picker
                            style={styles.input}
                            selectedValue={formik.values.genero}
                            onValueChange={(itemValue) => formik.setFieldValue('genero', itemValue)}
                        >
                            <Picker.Item label="Masculino" value="Masculino" />
                            <Picker.Item label="Femenino" value="Femenino" />
                        </Picker>

                        <Text style={styles.text}>DUI:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={formik.handleChange('dui')}
                            onBlur={formik.handleBlur('dui')}
                            value={formik.values.dui}
                        />
                        {formik.touched.dui && formik.errors.dui && (
                            <Text style={styles.errorText}>{formik.errors.dui}</Text>
                        )}

                        <Text style={styles.text}>NIT:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={formik.handleChange('nit')}
                            onBlur={formik.handleBlur('nit')}
                            value={formik.values.nit}
                        />
                        {formik.touched.nit && formik.errors.nit && (
                            <Text style={styles.errorText}>{formik.errors.nit}</Text>
                        )}

                        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={[styles.buttonF, { backgroundColor: '#6792F090' }]}>
                            <Icon name="calendar" size={15} color="white" />
                            <Text style={styles.textButton}>Seleccionar Fecha de Nacimiento</Text>
                        </TouchableOpacity>

                        <TextInput
                            style={styles.input}
                            value={formatDate(selectedDate)} // Muestra la fecha en formato 'DD/MM/AAAA'
                            onChangeText={formik.handleChange('fechanac')}
                            onBlur={formik.handleBlur('fechanac')}
                            editable={false}
                        />
                        {formik.touched.fechanac && formik.errors.fechanac && (
                            <Text style={styles.errorText}>{formik.errors.fechanac}</Text>
                        )}

                        {showDatePicker && (
                            <DateTimePicker
                                value={date}
                                mode="date"
                                display="default"
                                onChange={handleDateChange}
                            />
                        )}

                        <Text style={styles.text}>Número de Teléfono Móvil:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={formik.handleChange('telefonoMovil')}
                            onBlur={formik.handleBlur('telefonoMovil')}
                            value={formik.values.telefonoMovil}
                        />
                        {formik.touched.telefonoMovil && formik.errors.telefonoMovil && (
                            <Text style={styles.errorText}>{formik.errors.telefonoMovil}</Text>
                        )}

                        <Text style={styles.text}>Número de Teléfono de Casa:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={formik.handleChange('telefonoCasa')}
                            onBlur={formik.handleBlur('telefonoCasa')}
                            value={formik.values.telefonoCasa}
                        />
                        {formik.touched.telefonoCasa && formik.errors.telefonoCasa && (
                            <Text style={styles.errorText}>{formik.errors.telefonoCasa}</Text>
                        )}

                        <Text style={styles.text}>Correo Electrónico:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={formik.handleChange('correo')}
                            onBlur={formik.handleBlur('correo')}
                            value={formik.values.correo}
                        />
                        {formik.touched.correo && formik.errors.correo && (
                            <Text style={styles.errorText}>{formik.errors.correo}</Text>
                        )}


                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={formik.handleSubmit} style={[styles.button, { backgroundColor: '#6792F090', marginRight: 10}]}>
                                <Icon name="save" size={15} color="white" />
                                <Text style={styles.textButton}>Guardar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                formik.resetForm();
                                setDate(new Date()); // Restablecer la fecha a su valor inicial
                            }} style={[styles.button, { backgroundColor: 'red' }]}>
                                <Icon name="undo" size={15} color="white" />
                                <Text style={styles.textButton}>Reiniciar</Text>
                            </TouchableOpacity>
                        </View>

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
        height: 800,
        borderColor: 'cyan',
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    text: {
        fontSize: 17,
        fontWeight: '400',
        color: 'white',
    },
    input: {
        width: 250,
        height: 35,
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#ffffff90',
        marginBottom: 10,
    },
    textButton: {
        fontSize: 17,
        fontWeight: '400',
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
    buttonF: {
        width: 300,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        borderColor: 'cyan',
        borderWidth: 1,
        flexDirection: 'row',
    }
});

export default Clinica;