import React, {useState} from 'react';
import {View} from 'react-native';
import { Formik, Field } from 'formik';
import EnterEmail from '~/Components/EnterEmail';
import EnterPassword from '~/Components/EnterPassword'
import {
    LoginButton,
    LoginText,
    ErrorMessage
} from './styles.js';
import auth from '@react-native-firebase/auth';
import {Actions} from 'react-native-router-flux';

function Form() {
    const [error, setError] = useState(false);

    const handleSubmit = async (values) => {
        setError(false);
        let email = values.email;
        let password = values.password;
        try{
            const user = await auth().signInWithEmailAndPassword(email, password);
            Actions.account();
        }
        catch(error) {
            setError(true);
            console.log(error);
        }
    }


    return(
            <Formik
                initialValues={{email: '', password: ''}}
                onSubmit={handleSubmit}
            >
                {
                    ({handleSubmit}) => (
                        <View style={{display: 'flex', alignItems: 'center', gap: 20}}>
                            <EnterEmail name='email'/>
                            <EnterPassword name='password'/>
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