/* Libraries That Needed */
import React, { useReducer, useCallback, useState, useEffect } from 'react';

import { View, Text, Alert, ActivityIndicator, Platform, AsyncStorage, ScrollView, Picker, KeyboardAvoidingView } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import Card from '../../../components/UI/Card';
import Input from '../../../components/UI/Input';
import Button from '../../../components/UI/Button';
import styles from './styles';
import colors from '../../../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { saveAuction, resetAuction } from '../../../store/actions/auction';
/********************************/

const Auction = ({ navigation }) => {

    const dispatch = useDispatch();
    const item = useSelector(state => state.auction.item);
    const bidders = useSelector(state => state.auction.bidders);
    const transactions = useSelector(state => state.auction.transactions);
    const savedwinner = useSelector(state => state.auction.winner);

    const [isLoading, setIsLoading] = useState(false);
    const [auctionDone, setAuctionDone] = useState(false);
    const [summery, setSummery] = useState(null);
    const [selectedPrice, setSelectedPrice] = useState();
    const [heighestPrice, setHeighestPrice] = useState(item.price);
    const [totalProfit, setTotalProfit] = useState(0);
    const [selectedBidder, setSelectedBidder] = useState(bidders.length ? bidders[0].name : '');
    const [winner, setWinner] = useState('');
    const HeadTable = ['Starting Price', 'Bidder', 'Bid', 'Profit (USD)'];
    const [tableState, setTableState] = useState({ HeadTable, DataTable: [] });


    const selectedBidderPriceHandler = (inputIdentifier, inputValue, inputValidity) => {
        setSelectedPrice(inputValue);
    };

    const addBid = () => {
        const biddsCopy = tableState.DataTable;
        if (item.price > selectedPrice || biddsCopy.length ? selectedPrice <= biddsCopy[biddsCopy.length - 1][2] : false) {
            Alert.alert(
                'Not Valid!',
                'Price Must Be Greater Than ' + item.name + ' Price and last Bidder Price',
                [
                    { text: 'Ok', onPress: () => { }, style: 'cancel' },
                ],
            )
            return;
        }
        const td = ['', selectedBidder, selectedPrice, selectedPrice - item.price];
        biddsCopy.push(td);
        setTableState({
            HeadTable,
            DataTable: biddsCopy
        });
        setHeighestPrice(selectedPrice);
        setWinner(selectedBidder);
        // console.log(totalProfit);

        let totalProf = parseInt(totalProfit);
        totalProf = totalProf + (parseInt(selectedPrice) - item.price);
        // console.log(totalProf);

        setTotalProfit(totalProf);
    };

    const showSummery = () => {
        const biddsCopy = tableState.DataTable;
        const summery = [item.price, '', 'Total Profit', totalProfit];
        biddsCopy.push(summery);
        // setAuctionDone(true);
        setSummery('Winner: ' + winner + ' Done\n Price: ' + heighestPrice + ' USD');
        setTableState({
            HeadTable,
            DataTable: biddsCopy
        });
    };

    const onSaveAuction = async () => {
        setIsLoading(true);
        await dispatch(saveAuction(item, bidders, tableState.DataTable, winner));
        setIsLoading(false);
        // dispatch(resetAuction());
        Alert.alert(
            'Congratulations!',
            'Auction Saved.',
            [
                { text: 'Ok', onPress: () => { }, style: 'cancel' },
            ],
        )

    };

    const loadData = useCallback(() => {
        AsyncStorage.getItem('auctionDB', async (err, result) => {
            result = JSON.parse(result);
            if (result != null && result != undefined) {
                // console.log('user Id is ' + result.userId);
                if (result.winner != "") {
                    setWinner(result.winner);
                }
                if (result.transactions.length>=1) {
                    setTableState({ HeadTable, DataTable: result.transactions });

                    const highetsprc = result.transactions[result.transactions.length - 2][2];
                    setHeighestPrice(highetsprc);
                    setSummery('Winner: ' + result.winner + ' Done\n Price: ' + highetsprc + ' USD');
                }
            }
        });
    });
    useEffect(() => {
        loadData();
    }, []);

    return (
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={70} >
            <ScrollView style={styles.scrollView}>

                <View style={styles.screen}>
                    <Card style={styles.card}>
                        <Text style={styles.itemTitle}>Selected Item</Text>
                        <Input
                            id="Name"
                            icon={Platform.OS == "android" ? "md-person" : "ios-person"}
                            autoCapitalize="none"
                            initialValue={item.name}
                            parentStyle={styles.accountCont}
                            txtInptStyle={styles.auctionTxt}
                            onInputChange={() => { }}
                            disabled
                            initiallyValid
                        />
                        <Input
                            id="Price"
                            icon={Platform.OS == "android" ? "md-pricetag" : "ios-pricetag"}
                            keyboardType='numeric'
                            price
                            autoCapitalize="none"
                            initialValue={item.price}
                            parentStyle={styles.accountCont}
                            txtInptStyle={styles.auctionTxt}
                            onInputChange={() => { }}
                            disabled
                            initiallyValid
                        />
                    </Card>
                    <Card style={styles.card}>
                        <Text style={styles.itemTitle}>Bidders</Text>
                        <View style={styles.addPriceCont}>
                            <Picker
                                mode='dropdown'
                                style={styles.filterInput}
                                selectedValue={selectedBidder}
                                onValueChange={(itemValue, itemIndex) => {
                                    setSelectedBidder(itemValue);
                                }
                                }>
                                {
                                    bidders.map((val, key) => {
                                        return <Picker.Item key={key} label={val.name} value={val.name} />;
                                    })
                                }
                            </Picker>
                            <Input
                                id="bidderPrice"
                                icon={Platform.OS == "android" ? "md-pricetag" : "ios-pricetag"}
                                placeholder="Price"
                                placeholderTextColor={colors.grey}
                                keyboardType='numeric'
                                price
                                autoCapitalize="none"
                                initialValue=""
                                txtInptStyle={styles.auctionTxt}
                                onInputChange={selectedBidderPriceHandler}
                            />
                            {
                                !auctionDone ?
                                    <Button onPress={addBid} containerStyle={styles.bidBtn}>
                                        <Text style={styles.bidTxt}>Bid</Text>
                                    </Button> : null
                            }
                        </View>
                    </Card>
                    <Card style={styles.card}>
                        <Table borderStyle={{ borderWidth: 1, borderColor: '#ffa1d2' }}>
                            <Row data={tableState.HeadTable} style={styles.HeadStyle} textStyle={styles.TableText} />
                            <Rows data={tableState.DataTable} textStyle={styles.TableText} />
                        </Table>
                        {summery ? <Text style={styles.summery}>{summery}</Text> : null}
                    </Card>
                    <View style={styles.endAuctionBtns}>
                        {
                            !auctionDone ?
                                <Button containerStyle={styles.endAuctionBtn} onPress={showSummery}>
                                    <Text style={styles.startAuctionBtn}>End Auction</Text>
                                </Button> : null
                        }
                        <Button onPress={onSaveAuction} containerStyle={styles.saveAuctionBtn}>
                            {
                                isLoading ?
                                    <ActivityIndicator size="small" color={colors.primary} />
                                    :
                                    <Text style={styles.startAuctionBtn}>Save Auction</Text>
                            }
                        </Button>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
export { Auction };
