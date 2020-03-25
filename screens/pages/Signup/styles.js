import { StyleSheet } from 'react-native';
import COLORS from '../../../constants/colors';

export default StyleSheet.create({
    pageCont:{
        flex:1,
        backgroundColor:COLORS.background
    },
    screen: {
        flex: 1,
        alignItems: 'center',
        paddingVertical:50
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
    logoStyle: {
        width: 100,
        height: 100
    },
    logintxt: {
        color: COLORS.primary,
        fontFamily:'open-sans-bold'
    },
    accountCont: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    gmailCont:{
        borderBottomColor: '#ccc',
        borderBottomWidth: 2,
    },
    colorBlack:{
        color:'black'
    }
});