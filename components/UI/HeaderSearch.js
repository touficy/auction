import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';

import colors from '../../constants/colors';

const HeaderSearch = props => {
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    return (
        <SearchBar
            showLoading={isLoading}
            lightTheme
            round
            placeholder={props.placeholder}
            onChangeText={search => {
                setIsLoading(true);
                setSearch(search);
            }}
            onEndEditing={()=>setIsLoading(false)}
            value={search}
            containerStyle={styles.screen}
            inputContainerStyle={styles.inptContainer}
        />
    );
};

const styles = StyleSheet.create({
    screen: {
        width:'100%',
        backgroundColor: colors.primary,
    },
    inptContainer: {
        backgroundColor: '#f3f3f3'
    }
});

export default HeaderSearch;
