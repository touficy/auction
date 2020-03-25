import { StyleSheet } from 'react-native';
import COLORS from '../../../constants/colors';

export default StyleSheet.create({
    pageCont: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    screen: {
        flex: 1,
        justifyContent:'center',
        paddingVertical: 50
    },
    loginPgCont: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
        width: 200,
        height: 150
    },
    logintxt: {
        color: COLORS.primary,
        fontFamily: 'open-sans'
    },
    signupBtn: {
        width: '90%',
        height: 50,
        alignSelf: 'center',
        padding: 10,
        margin: 10
    },
    signupText: {
        flex: 1,
        alignSelf: 'center',
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    accountCont: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
});