import React from 'react';
import {Image} from 'react-native';
import HeaderBar from '~/Components/HeaderBar';
import MenuBar from '~/Components/MenuBar';
import icons from './icons';
import Form from './Form';
import {
    LoginContainer,
    LoginTitle,
    Button,
    ButtonText,
    Message
} from './styles.js';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

function Login() {

    const handleRegister = () => {

    } 

    const handleGoogleLogin = async () => {
        GoogleSignin.configure({
            webClientId: '400279370588-hlaf463h74nf6b5mnp3jbb7ovthatogq.apps.googleusercontent.com'
        });

        try{
           await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
           const {idToken} = await GoogleSignin.signIn();
           const googleCredential = auth.GoogleAuthProvider.credential(idToken);
           await auth().signInWithCredential(googleCredential);
        }
        catch(error){
            alert("Can't sign in with Google")
        }
    }

    return(
        <>
            <HeaderBar back={true}/>
            <MenuBar/>
            <LoginContainer>
                <LoginTitle>
                    Log in with your email and password
                </LoginTitle>
                <Form/>
                <Message>
                    ...or you can log in with Google
                </Message>
                <Button onPress={handleGoogleLogin}>
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
            </LoginContainer>        
        </>

    )
}

export default Login