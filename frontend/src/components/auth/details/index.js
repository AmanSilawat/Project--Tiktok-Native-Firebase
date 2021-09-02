import React, { useState } from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import { Feather } from '@expo/vector-icons';
import styles from './style';
import { useDispatch } from 'react-redux';
import { login, register } from '../../../redux/actions/auth';


export default function AuthDetails({ authPage, setDetailsPage }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    console.log('authPage :>> ', authPage);

    const dispatch = useDispatch()
    const handleLogin = () => {
        dispatch(login(email, password))
            .then(() => {
                console.log('login successful');
            })
            .catch(() => {
                console.log('login unsuccessful');
            })
    }

    const handleRegister = () => {
        dispatch(register(email, password))
            .then(() => {
                console.log('r successful');
            })
            .catch(() => {
                console.log('r unsuccessful');
            })
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setDetailsPage(false)}>
                <Feather name="arrow-left" size={24} color="black" />
            </TouchableOpacity>
            <TextInput
                onChangeText={(text) => setEmail(text)}
                placeholder='Email'
                style={styles.textInput}
            />
            <TextInput
                onChangeText={(text) => setPassword(text)}
                placeholder='Password'
                secureTextEntry
                style={styles.textInput}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => authPage == 0 ? handleLogin() : handleRegister()}
            >
                <Text style={styles.buttonText}>{authPage == 0 ? 'Sign In' : 'Sign Up'}</Text>
            </TouchableOpacity>
        </View>
    )
}
