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
import firestore from '@react-native-firebase/firestore';
import {Actions} from 'react-native-router-flux';
import Dialog from 'react-native-dialog';

function Form() {
    const [error, setError] = useState('');
    const [eula, setEula] = useState(false);
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

    const handleEula = () => {
        setEula(!eula);
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
            setEula(!eula);            
            let userCredentials = await auth().createUserWithEmailAndPassword(email, password);
            Alert.alert('Account has been created');
            await auth().currentUser.updateProfile({
                displayName: username
            })
            await firestore().collection(userCredentials.user.uid).doc('userInfo').set({
                aboutMe: '',
                imageURL: '',
                username,
                agreedToEULA: true,
            });     
            Actions.account();
        }
        catch(error){
            if(error.code === 'auth/email-already-in-use')
                setError('Email is already registered')
            else if(error.code === 'auth/invalid-email')
                setError('Invalid Email');
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    }


    return(
        <>
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
                            <Button onPress={handleEula}>
                                {loading ? <ActivityIndicator size='small' color='black'/> : 
                                    <ButtonText>
                                        register
                                    </ButtonText>}
                            </Button>

                            <Dialog.Container visible={eula}>
                                <Dialog.Title>
                                    End-user license agreement
                                </Dialog.Title>
                                <Dialog.Description>
                                    By creating this account, you must agree 
                                    that you will not upload any inappropriate videos 
                                    or abuse other users in this app. A breach in this agreement 
                                    will result in the video being taken down and/or the uploader being banned.
                                    Do you accept these terms?
                                </Dialog.Description>
                                <Dialog.Button label='ACCEPT' onPress={handleSubmit}/>
                                <Dialog.Button label='DECLINE' onPress={handleEula}/>
                            </Dialog.Container>
                        </>
                    )
                }
            </Formik>        
        </>

    )
}

export default Form;