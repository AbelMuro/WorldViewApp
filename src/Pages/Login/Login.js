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
import { Actions } from 'react-native-router-flux';
import firestore from '@react-native-firebase/firestore';

function Login() {

    const handleRegister = () => {
        Actions.register();
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

           const userDoc= await firestore().collection(`${idToken.slice(0, 29)}`).doc('userInfo').get();
           if(userDoc.exists){
               const userInfo = userDoc.data();
               await auth().currentUser.updateProfile({
                    displayName: userInfo.username, 
                    photoURL: userInfo.imageURL
                })
           }
           Actions.account();
        }
        catch(error){
            alert("Your google email is already being used by another account");
            console.log(error);
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