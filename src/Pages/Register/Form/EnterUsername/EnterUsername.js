import React from 'react';
import {TextInput} from 'react-native';
import {useField} from 'formik'
import {ErrorMessage} from './styles.js'

const validate = (username) => {
    if(!username)
        return "Can't be empty";
    else
        return '';
}


function EnterUsername({name}) {
    const [field, meta, helpers] = useField({name, validate})
    
    const styles = {
        width: '100%',
        height: 56,
        borderRadius: 10,
        backgroundColor: 'white',
        fontFamily: 'CrimsonText',
        fontSize: 16,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 14,
        paddingBottom: 14,
        color: 'black',
        borderStyle: 'solid',
        borderWidth: 3, 
        borderColor: meta.error && meta.touched ? 'red' : 'white',
    }

    return(
        <>
            <TextInput
                name={name}
                style={styles}
                onChangeText={helpers.setValue}
                onBlur={helpers.setTouched}
                placeholder={'Enter Username'}
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

export default EnterUsername;