import React, {useState} from 'react';
import {View, Modal, Text} from 'react-native';
import { Formik, Field } from 'formik';
import EnterEmail from './EnterEmail';
import EnterPassword from './EnterPassword'
import {
    LoginButton,
    LoginText,
    ErrorMessage
} from './styles.js';
import {auth} from '~/Firebase';
import { 
    createUserWithEmailAndPassword, 
    updateProfile, 
    signOut, 
    sendEmailVerification, 
    sendSignInLinkToEmail,
    signInWithEmailAndPassword
} from 'firebase/auth';

function Form() {
    const [error, setError] = useState(false);

    const validateForm = (values) => {
        const errors = {};

        if(!values.email)
            errors.email = "Can't be empty";
        if(!values.password)
            errors.password = "Can't be empty";

        return errors;
    }



    const handleSubmit = async (values) => {
        let email = values.email;
        let password = values.password;

        try{
            const userCredentials = await signInWithEmailAndPassword(auth, email, password);
            setError(false);
        }
        catch(error){
            setError(true);
        }
    }


    return(
            <Formik
                initialValues={{email: '', password: ''}}
                onSubmit={handleSubmit}
                validate={validateForm}
            >
                {
                    ({handleChange, handleBlur, handleSubmit, errors, touched}) => (
                        <View style={{display: 'flex', alignItems: 'center', gap: 20}}>
                            <Field
                                name='email'
                                type='email'>
                                    {({field}) => (
                                        <EnterEmail 
                                            {...field} 
                                            error={errors} 
                                            onChangeText={handleChange('email')} 
                                            onBlur={handleBlur('email')} 
                                            touched={touched}/>
                                    )}
                            </Field>
                            <Field
                                name='password'
                                type='password'>
                                    {({field}) => (
                                        <EnterPassword 
                                            {...field} 
                                            error={errors} 
                                            onChangeText={handleChange('password')} 
                                            onBlur={handleBlur('password')} 
                                            touched={touched}/>
                                    )}
                            </Field>
                            {error && 
                                <ErrorMessage>
                                    Incorrect email or password             
                                </ErrorMessage>
                            }
                            <LoginButton onPress={handleSubmit}>
                                <LoginText>
                                    Log in
                                </LoginText>
                            </LoginButton>                  
                        </View>
                    )
                }
            </Formik>       

    )
}

export default Form;