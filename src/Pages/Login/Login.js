import React from 'react';
import {Image, Platform} from 'react-native';
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
import { AppleButton, appleAuth} from '@invertase/react-native-apple-authentication';
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
           let credentials = await auth().signInWithCredential(googleCredential);

           const userDoc = await firestore().collection(`${credentials.user.uid}`).doc('userInfo').get();
           if(!userDoc.exists)
                await firestore().collection(`${credentials.user.uid}`).doc('userInfo').set({});
            
           Actions.account();
        }
        catch(error){
            alert("Your google email is already being used by another account");
            console.log(error);
        }
    }

    const handleAppleLogin = async () => {

        try{
            const appleAuthRequestResponse = await appleAuth.performRequest({
                requestedOperation: appleAuth.Operation.LOGIN,
                requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
            });
            
            // Ensure Apple returned a user identityToken
            if (!appleAuthRequestResponse.identityToken) {
                throw new Error('Apple Sign-In failed - no identify token returned');
            }
            
            // Create a Firebase credential from the response
            const { identityToken, nonce } = appleAuthRequestResponse;
            const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
            
            // Sign the user in with the credential
            let userCredentials = await auth().signInWithCredential(appleCredential);     

            const userDoc = await firestore().collection(`${userCredentials.user.uid}`).doc('userInfo').get();
            if(!userDoc.exists)
                await firestore().collection(`${userCredentials.user.uid}`).doc('userInfo').set({});

            Actions.account();      
        }
        catch(error){
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
                {Platform.OS === 'android' &&
                    <Message>
                        ...or you can log in with Google
                    </Message>}
               {Platform.OS === 'android' ? 
                    <Button onPress={handleGoogleLogin}>
                        <Image source={icons['google']} style={{width: 40, height: 40}}/>
                        <ButtonText>
                            Sign in with Google
                        </ButtonText>
                    </Button> : 
                    <AppleButton
                        buttonStyle={AppleButton.Style.WHITE}
                        buttonType={AppleButton.Type.SIGN_IN}
                        style={{width: '100%', height: 45}}
                        onPress={handleAppleLogin}/>
                }
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