import React from 'react';
import {TextInput} from 'react-native';
import {useField} from 'formik';
import {ErrorMessage} from './styles.js'

const validate = (password) => {
    if(!password)
        return true;
    else
        return false;
} 

function EnterPassword({name}) {
    const [field, meta, helpers] = useField({name, validate})

    const style = {
        width: '100%',
        height: 56,
        fontFamily: 'CrimsonText',
        fontSize: 16,
        borderRadius: 10,
        backgroundColor: 'white',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 14,
        paddingBottom: 14,
        color: 'black',
        borderStyle: 'solid',
        borderWidth: 3,
        borderColor: meta.error && meta.touched? 'red' : 'white',
    }


    return(
        <>
            <TextInput 
                name='password'
                style={style}
                onChangeText={helpers.setValue}
                onBlur={helpers.setTouched}
                placeholder={'Enter Password'}
                placeholderTextColor={meta.error && meta.touched ? 'red' : 'grey'}
            />      
            {meta.error && meta.touched && 
                <ErrorMessage>
                    Can't be empty    
                </ErrorMessage>  
            }  
        </>

    )
}

export default EnterPassword;