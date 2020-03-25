/* Libraries That Needed */
import React, { useReducer, useEffect, useCallback, useState } from 'react';

import { View, Text, Image, TouchableOpacity, Alert, ActivityIndicator, ScrollView, KeyboardAvoidingView } from 'react-native';
import Card from '../../../components/UI/Card';
import Input from '../../../components/UI/Input';
import Button from '../../../components/UI/Button';
import styles from './styles';
import colors from '../../../constants/colors';
import { useDispatch } from 'react-redux';
import { login } from '../../../store/actions/auth';
/********************************/
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }

        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        };
    }
    return state;
};
const Login = ({ navigation }) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            account: '',
            password: ''
        },
        inputValidities: {
            account: false,
            password: false
        },
        formIsValid: false
    });
    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {

            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            });
        },
        [dispatchFormState]
    );
    const submitLogin = async () => {
        setIsLoading(true);
        if (formState.formIsValid) {
            await dispatch(login(formState.inputValues.account, formState.inputValues.password, () => navigation.navigate('Home')));
            setIsLoading(false);
        } else {
            setIsLoading(false);
            Alert.alert(
                'Not Valid!',
                'All Fields Required',
                [
                    { text: 'Ok', onPress: () => { }, style: 'cancel' },
                ],
            )
        }

    };
    return (
        <ScrollView style={styles.pageCont}>
            <KeyboardAvoidingView style={styles.pageCont} behavior='padding' keyboardVerticalOffset={20} >
                <View style={styles.screen}>
                    <View style={styles.loginPgCont}>
                        <Image style={styles.logoStyle} resizeMode="contain" source={require('../../../assets/imgs/logo.png')} />
                        <Card style={styles.card}>
                            <Input
                                id="account"
                                icon={Platform.OS == "android" ? "md-person" : "ios-person"}
                                keyboardType="email-address"
                                placeholder="Account"
                                placeholderTextColor={colors.grey}
                                required
                                email
                                autoCapitalize="none"
                                errorText="Please enter a valid Account."
                                onInputChange={inputChangeHandler}
                                initialValue=""
                                parentStyle={styles.accountCont}
                            />
                            <Input
                                id="password"
                                icon={Platform.OS == "android" ? "md-lock" : "ios-lock"}
                                placeholder="Password"
                                placeholderTextColor={colors.grey}
                                keyboardType="default"
                                secureTextEntry
                                required
                                minLength={5}
                                autoCapitalize="none"
                                errorText="Please enter a valid password."
                                onInputChange={inputChangeHandler}
                                initialValue=""
                            />
                        </Card>
                        <Button onPress={submitLogin}>
                            {
                                isLoading ?
                                    <ActivityIndicator size="small" color={colors.primary} />
                                    :
                                    <Text style={styles.logintxt}>Log in</Text>
                            }
                        </Button>
                        <TouchableOpacity style={styles.signupBtn} onPress={() => { navigation.navigate('Signup') }}>
                            <Text style={styles.signupText}>Sign up</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={[styles.signupBtn, { alignSelf: 'flex-end' }]} onPress={() => { }}>
                        <Text style={[styles.signupText, { color: '#d9d9db' }]}>I FORGET MY PASSWORD</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
}
export { Login };
