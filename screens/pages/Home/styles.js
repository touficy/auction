import { StyleSheet } from 'react-native';
import COLORS from '../../../constants/colors';

export default StyleSheet.create({
    scrollView:{
        backgroundColor: COLORS.background,
    },
    screen: {
        flex: 1,
        alignItems: 'center',
        paddingVertical:10
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
    },
    itemTitle:{
        fontFamily:'open-sans-bold',
        textAlign:'center',
        fontSize:18,
        color:COLORS.accent
    },
    biddersTitle:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    addBidderBtn:{
        width:'auto',
        height:'auto',
        backgroundColor:'transparent',
        borderWidth:0
    },
    addBidderText:{
        paddingTop:0,
        paddingHorizontal:10
    },
    titleBtnCont:{
        flexDirection:'row'
    }
});