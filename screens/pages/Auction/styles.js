import { StyleSheet } from 'react-native';
import colors from '../../../constants/colors';

export default StyleSheet.create({
    scrollView: {
        backgroundColor: colors.background,
    },
    screen: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10
    },
    card: {
        width: '90%',
        overflow: 'hidden',
        borderRadius: 10,
        marginHorizontal: 10,
        marginVertical: 25,
        backgroundColor: '#f2f2f2',
        padding: 10,
        justifyContent: 'center'
    },
    itemTitle: {
        fontFamily: 'open-sans-bold',
        textAlign: 'center',
        fontSize: 18,
        color: colors.accent
    },
    auctionTxt: {
        color: 'black',
        fontFamily: 'open-sans-bold'
    },
    accountCont: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    colorBlack: {
        color: 'black'
    },
    startAuctionBtn: {
        color: colors.primary
    },
    bidBtn: {
        width: '50%',
        alignSelf: 'center',
        backgroundColor: colors.danger
    },
    bidTxt: {
        color: colors.primary
    },
    filterTitle: {
        fontFamily: 'open-sans-bold',
        fontSize: 16,
        color: 'grey'
    },
    filterInput: {
        fontFamily: 'open-sans',
    },
    container: {
        flex: 1,
        padding: 18,
        paddingTop: 35,
        backgroundColor: '#ffffff'
    },
    HeadStyle: {
        height: 50,
        alignContent: "center",
        backgroundColor: '#ffe0f0'
    },
    TableText: {
        margin: 10
    },
    endAuctionBtns: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    endAuctionBtn: {
        width: '40%',
        marginHorizontal: 15,
        backgroundColor: colors.danger
    },
    saveAuctionBtn: {
        width: '40%',
        marginHorizontal: 15,
    },
    summery:{
        fontFamily:'open-sans-bold',
        fontSize:18,
        textAlign:'center',
        color:'red',
        paddingVertical:5
    }
});