import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import COLORS from '../../constants/colors';

import { HeaderButtons, Item, HeaderButton } from 'react-navigation-header-buttons';

const CustomsubButton = props => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS === 'android' ? 'white' : COLORS.primary}
    />
  );
};

const CustomeHeaderButton = ({ title, name, onPress, anotherItem }) => {
  
  return <HeaderButtons HeaderButtonComponent={CustomsubButton}>
    <Item
      title={title}
      iconName={name}
      buttonStyle={{ color: 'black' }}
      onPress={onPress}
    />
    {
      anotherItem != undefined ?
        <Item
          title={anotherItem.title}
          iconName={anotherItem.name}
          buttonStyle={{ color: 'black' }}
          onPress={anotherItem.onPress}
        />: null
    }
  </HeaderButtons>
};

export default CustomeHeaderButton;
