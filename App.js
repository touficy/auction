import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import * as Fonts from 'expo-font';
import { AppLoading } from 'expo';
import NavigationController from './navigation/NavigationController';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import autReducer from './store/reducers/auth';
import auctionReducer from './store/reducers/auction';

const mainReducer = combineReducers({
  auth: autReducer,
  auction: auctionReducer
});

const store = createStore(mainReducer, applyMiddleware(ReduxThunk));
const fetshFonts = () => {
  return Fonts.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};
export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetshFonts}
        onFinish={() => setFontLoaded(true)}
      />);
  }  
  return (
    <>
      <StatusBar barStyle="dark-content" translucent backgroundColor="rgba(0, 0, 0, .15)" />
      <Provider store={store}>
        <NavigationController />
      </Provider>
    </>
  );
}
