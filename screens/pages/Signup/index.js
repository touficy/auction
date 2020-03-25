/* Libraries That Needed */
import React, { useReducer, useCallback, useState } from 'react';

import { View, Text, Image, Alert, ActivityIndicator, KeyboardAvoidingView, ScrollView } from 'react-native';
import Card from '../../../components/UI/Card';
import Input from '../../../components/UI/Input';
import Button from '../../../components/UI/Button';
import styles from './styles';
import colors from '../../../constants/colors';
import { signup } from '../../../store/actions/auth';
import { useDispatch } from 'react-redux';
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

const Signup = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            gmail: '',
            name: '',
            password: ''
        },
        inputValidities: {
            gmail: false,
            name: false,
            password: false
        },
        formIsValid: false
    });

    const submitSignup = async () => {
        setIsLoading(true);

        if (formState.formIsValid) {
            await dispatch(signup(formState.inputValues.gmail, formState.inputValues.name, formState.inputValues.password, () => navigation.navigate('Home')));
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
    return (
        <KeyboardAvoidingView style={styles.pageCont} behavior='padding' keyboardVerticalOffset={100} >
            <ScrollView style={styles.pageCont}>
                <View style={styles.screen}>
                    <Image style={styles.logoStyle} resizeMode="contain" source={require('../../../assets/imgs/camera.png')} />
                    <Card style={styles.card}>
                        <Input
                            id="gmail"
                            icon={Platform.OS == "android" ? "md-mail" : "ios-mail"}
                            keyboardType="email-address"
                            placeholder="Gmail"
                            required
                            email
                            autoCapitalize="none"
                            errorText="Please enter a valid Gmail."
                            onInputChange={inputChangeHandler}
                            initialValue=""
                            parentStyle={styles.gmailCont}
                            iconStyle={styles.colorBlack}
                            txtInptStyle={styles.colorBlack}
                            placeholderColor={"#000000"}
                        />
                        <Input
                            id="name"
                            icon={Platform.OS == "android" ? "md-person" : "ios-person"}
                            placeholder="Name"
                            placeholderTextColor={colors.grey}
                            required
                            autoCapitalize="none"
                            errorText="Please enter a valid Name."
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
                    <Button onPress={submitSignup}>
                        {
                            isLoading ?
                                <ActivityIndicator size="small" color={colors.primary} />
                                :
                                <Text style={styles.logintxt}>Create a new account</Text>
                        }
                    </Button>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
export { Signup };
