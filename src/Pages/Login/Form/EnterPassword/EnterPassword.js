import React, {useState, useEffect} from 'react';
import {TextInput} from 'react-native';

function EnterPassword({onChangeText, onBlur, error, touched}) {

    const style = {
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
        borderColor: error.password && touched.password ? 'red' : 'white',
    }


    return(
        <TextInput 
            style={style}
            placeholder={error.password && touched.password ? "Can't be empty" : 'Enter Password'}
            placeholderTextColor={error.password && touched.password ? 'red' : 'grey'}
            onChangeText={onChangeText}
            onBlur={onBlur}
        />
    )
}

export default EnterPassword;