import React from 'react';
import {Image, View} from 'react-native';
import EnterEmail from './EnterEmail';
import EnterPassword from './EnterPassword'
import {
    LoginButton,
    LoginText,    
    Button,
    ButtonText, 
    Message,
} from './styles.js';
import icons from './icons';
import { Formik, Field } from 'formik';

function Form() {

    const handleRegister = () => {

    } 


    const validateForm = (values) => {
        const errors = {};

        if(!values.email)
            errors.email = "Can't be empty";
        if(!values.password)
            errors.password = "Can't be empty";

        return errors;
    }



    const handleSubmit = (values) => {
        console.log(values)
    }


    return(
        <>
            <Formik
                initialValues={{email: '', password: ''}}
                onSubmit={handleSubmit}
                validate={validateForm}
            >
                {
                    ({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
                        <View style={{display: 'flex', alignItems: 'center', gap: 20}}>
                            <Field
                                name='email'
                                type='email'>
                                    {({field}) => (
                                        <EnterEmail {...field} error={errors} onChangeText={handleChange('email')} onBlur={handleBlur('email')} touched={touched}/>
                                    )}
                            </Field>
                            <Field
                                name='password'
                                type='password'>
                                    {({field}) => (
                                        <EnterPassword {...field} error={errors} onChangeText={handleChange('password')} onBlur={handleBlur('password')} touched={touched}/>
                                    )}
                            </Field>
                            <LoginButton onPress={handleSubmit}>
                                <LoginText>
                                    Log in
                                </LoginText>
                            </LoginButton>                  
                        </View>
                    )
                }
            </Formik>
            <Message>
                ...or you can log in with Google
            </Message>
            <Button>
                <Image source={icons['google']} style={{width: 40, height: 40}}/>
                <ButtonText>
                    Sign in with Google
                </ButtonText>
            </Button>
            <Button onPress={handleRegister}>
                <ButtonText style={{fontSize: 12}}>
                    Don't have an account? Register here.
                </ButtonText>
            </Button>
        </>
    )
}

export default Form;