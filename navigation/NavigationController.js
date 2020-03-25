/* Libraries That Needed */
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';

// Screens And Custom Components 
import { Login,Signup,Home, Intro, Auction} from '../screens/';

import COLORS from '../constants/colors';
/***************************/

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? COLORS.primary : '',
    },
    
};

const homeNavigator = createStackNavigator({
    login:{
        screen:Login,
        navigationOptions:{
            headerShown: false
        } 
    },
    Signup,
    Home,
    Auction,
}, {
    defaultNavigationOptions: defaultNavOptions,
});

const RootNavigator = createSwitchNavigator({
    startup: Intro,
    main: homeNavigator,
});

export default createAppContainer(RootNavigator);