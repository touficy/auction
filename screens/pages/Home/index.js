/* Libraries That Needed */
import React, { useReducer, useCallback, useState } from 'react';

import { View, Text, Alert, ActivityIndicator, Platform, ScrollView } from 'react-native';
import Card from '../../../components/UI/Card';
import Input from '../../../components/UI/Input';
import Button from '../../../components/UI/Button';
import styles from './styles';
import colors from '../../../constants/colors';
import { useDispatch, useSelector } from 'react-redux';

import { Ionicons, AntDesign } from '@expo/vector-icons'
import { addAuction } from '../../../store/actions/auction';
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

const Home = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [bidders, setBedders] = useState([]);

    const dispatch = useDispatch();
    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            itemName: '',
            itemPrice: '',
            bidders: [{ id: 0 }]
        },
        inputValidities: {
            itemName: false,
            itemPrice: false,
            bidders: true
        },
        formIsValid: false
    });

    const submitSignup = async () => {
        setIsLoading(true);

        if (formState.formIsValid) {
            await dispatch(addAuction(
                {
                    name: formState.inputValues.itemName,
                    price: formState.inputValues.itemPrice,
                },
                bidders
            ));
            setIsLoading(false);
            navigation.navigate("Auction");
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
    const onBidderinputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            // console.log(inputIdentifier+" => "+inputValue);
            const copyBedders = bidders;
            copyBedders.push({
                id: inputIdentifier,
                name: inputValue,
            });
            setBedders(copyBedders);
        },
        [setBedders]
    );
    const addBidder = () => {
        const copyArr = formState.inputValues.bidders;
        copyArr.push({ id: copyArr.length })
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: copyArr,
            isValid: true,
            input: 'bidders'
        });

    };

    const deleteBidder = () => {
        const copyArr = formState.inputValues.bidders;
        if (copyArr.length > 1) {
            copyArr.pop();
        }
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: copyArr,
            isValid: true,
            input: 'bidders'
        });
    }    
    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.screen}>
                <Card style={styles.card}>
                    <Text style={styles.itemTitle}>Item Details</Text>
                    <Input
                        id="itemName"
                        icon={Platform.OS == "android" ? "md-person" : "ios-person"}
                        placeholder="Item Name"
                        placeholderTextColor={colors.grey}
                        required
                        autoCapitalize="none"
                        errorText="Please enter a valid Name."
                        onInputChange={inputChangeHandler}
                        initialValue=""
                        parentStyle={styles.accountCont}
                    />
                    <Input
                        id="itemPrice"
                        icon={Platform.OS == "android" ? "md-pricetag" : "ios-pricetag"}
                        keyboardType='numeric'
                        placeholder="Item Price"
                        placeholderTextColor={colors.grey}
                        required
                        price
                        autoCapitalize="none"
                        errorText="Please enter a valid Price."
                        onInputChange={inputChangeHandler}
                        initialValue=""
                        parentStyle={styles.accountCont}
                    />
                </Card>
                <Card style={styles.card}>
                    <View style={styles.biddersTitle}>
                        <Text style={styles.itemTitle}>Bidders</Text>
                        <View style={styles.titleBtnCont}>
                            <Button onPress={addBidder} containerStyle={styles.addBidderBtn} childStyle={styles.addBidderText}>
                                <Ionicons
                                    name={Platform.OS == "android" ? "md-person-add" : "ios-person-add"}
                                    size={23}
                                    color={colors.accent}
                                />

                            </Button>
                            <Button onPress={deleteBidder} containerStyle={styles.addBidderBtn} childStyle={styles.addBidderText}>
                                <AntDesign
                                    name="deleteuser"
                                    size={23}
                                    color={colors.accent}
                                />

                            </Button>
                        </View>
                    </View>
                    {
                        formState.inputValues.bidders.map((value, index) => {
                            return <Input
                                id={`b${value.id}`}
                                key={`bidder${index}`}
                                icon={Platform.OS == "android" ? "md-person" : "ios-person"}
                                placeholder="Name"
                                placeholderTextColor={colors.grey}
                                required
                                autoCapitalize="none"
                                errorText="Please enter a valid Name."
                                onInputChange={onBidderinputChangeHandler}
                                initialValue=""
                                parentStyle={styles.accountCont}
                            />;
                        })
                    }
                </Card>

                <Button onPress={submitSignup}>
                    {
                        isLoading ?
                            <ActivityIndicator size="small" color={colors.primary} />
                            :
                            <Text style={styles.logintxt}>Start Auction</Text>
                    }
                </Button>
            </View>
        </ScrollView>
    );
}
export { Home };
