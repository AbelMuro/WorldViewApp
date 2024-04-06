import React, {useState} from 'react';
import {Alert, ActivityIndicator} from 'react-native';
import EnterEmail from '~/Components/EnterEmail';
import EnterPassword from '~/Components/EnterPassword';
import EnterUsername from './EnterUsername';
import {Formik} from 'formik';
import {
    Button,
    ButtonText,
    ErrorMessage
} from './styles.js'
import auth from '@react-native-firebase/auth';

function Form() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false)

    const validateForm = (values) => {
        let email = values.email;
        let password = values.password;
        let username = values.username;     
        let errors = {};

        if(!email)
            errors['email'] = 'Invalid Email';

        if(!password)
            errors['password'] = "Can't be empty"

        if(!username)
            errors['username'] = "Can't be empty"
        
        return errors;
    }

    const handleSubmit = async (values) => {
        setLoading(true);
        setError('');        
        let email = values.email;
        let password = values.password;
        let username = values.username;
        let emailRegex = /^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/;   

        if(!password.match(/[a-zA-Z]/) || !password.match(/\d/) || !password.match(/\W/) || password.length < 6){
            setError("Password doesn't meet the requirements");
            setLoading(false);
            return;
        }
        else if(!emailRegex.test(email)){
            setError('Invalid Email');
            setLoading(false);
            return;
        }
        
        try {
            await auth().createUserWithEmailAndPassword(email, password);
            Alert.alert('Account has been created');
            setLoading(false);
        }
        catch(error){
            if(error.code === 'auth/email-already-in-use')
                setError('Email is already registered')
            else if(error.code === 'auth/invalid-email')
                setError('Invalid Email');
        }
    }


    return(
        <Formik
            initialValues={{username: '', email: '', password: ''}}
            validate={validateForm}
            onSubmit={handleSubmit}
        >
            {
                ({handleSubmit}) => (
                    <>
                        <EnterUsername name='username'/>
                        <EnterEmail name='email'/>
                        <EnterPassword name='password'/>
                        {error && <ErrorMessage>{error}</ErrorMessage>}
                        <Button onPress={handleSubmit}>
                            {loading ? <ActivityIndicator size='small' color='black'/> : 
                                <ButtonText>
                                    register
                                </ButtonText>}
                        </Button>
                    </>
                )
            }
        </Formik>
    )
}

export default Form;