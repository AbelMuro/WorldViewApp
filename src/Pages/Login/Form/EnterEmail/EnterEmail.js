import React, {useState, useEffect} from 'react';
import {TextInput} from 'react-native';

function EnterEmail({onChangeText, onBlur, error, touched}) {

    const styles = {
        width: '100%',
        height: 56,
        borderRadius: 10,
        backgroundColor: 'white',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 14,
        paddingBottom: 14,
        color: 'black',
        borderStyle: 'solid',
        borderWidth: 3,
        borderColor: error.email && touched.email ? 'red' : 'white',
    }

    return(
        <TextInput
            style={styles}
            placeholder={error.email && touched.email ? "Can't be empty" : 'Enter Email'}
            placeholderTextColor={error.email && touched.email ? 'red' : 'grey'}
            onChangeText={onChangeText}
            onBlur={onBlur}
        />
    )
}

export default EnterEmail;