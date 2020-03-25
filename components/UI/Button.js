import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../constants/colors';

const Button = ({ onPress, children, containerStyle,childStyle }) => {
  const { textStyle, buttonStyle } = styles;
  return (
    <TouchableOpacity onPress={onPress} style={[buttonStyle,{...containerStyle}]}>
      <View style={[textStyle,{...childStyle}]}>{children}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    flex:1,
    alignSelf: 'center',
    color: 'white',
    paddingTop: 10,
    paddingBottom: 10,
  },
  buttonStyle: {
    width: '90%',
    height:40,
    backgroundColor: colors.accent,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius:8,
  }
});

export default Button ;
