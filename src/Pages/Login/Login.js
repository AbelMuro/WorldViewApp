import React, {useState} from 'react';
import {Image, Platform, SafeAreaView, Alert} from 'react-native';
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
import Dialog from 'react-native-dialog';

function Login() {
    const [eula, setEula] = useState(false);

    const handleRegister = () => {
        Actions.register();
    } 

    const handleAccept = async () => {
        const userDocRef = firestore().collection(`${auth().currentUser.uid}`).doc('userInfo');
        await userDocRef.update({
            agreedToEULA: true
        });
        setEula(false);
        Actions.account();
    }

    const handleDecline = async () => {
        await auth().signOut();
        setEula(false);
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
                await firestore().collection(`${credentials.user.uid}`).doc('userInfo').set({
                    aboutMe: '',
                    imageURL: credentials.user.photoURL || '',
                    username: credentials.user.displayName || '',
                });
           Actions.account();
        }
        catch(error){
            Alert.alert("Your google email is already being used by another account");
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
                Alert.alert('Apple Sign-In failed - no identify token returned');
                return;
            }
            
            // Create a Firebase credential from the response
            const { identityToken, nonce } = appleAuthRequestResponse;
            const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
            
            // Sign the user in with the credential
            const userCredentials = await auth().signInWithCredential(appleCredential);    
            const email = userCredentials.user.email;

            const userDocRef = firestore().collection(`${userCredentials.user.uid}`).doc('userInfo');
            const userDoc =  await userDocRef.get();
            if(!userDoc.exists){
                await userDocRef.set({
                    username: email.slice(0, email.indexOf('@')),
                    imageURL: userCredentials.user.photoURL || '',
                    aboutMe: '',
                    agreedToEULA: false,
                });     
                setEula(true);           
            }
            else {
                let userInfo = await userDocRef.get();
                userInfo = userInfo.data();
                if(!userInfo.agreedToEULA) {
                    setEula(true);
                    return;
                }
                Actions.account();  
            }  
        }
        catch(error){
            Alert.alert('Your email associated with your apple account is already being used')
            console.log(error);
        }
    }

    return(
        <SafeAreaView>
            <HeaderBar back={true}/>
            <MenuBar/>
            <LoginContainer>
                <LoginTitle>
                    Log in with your email and password
                </LoginTitle>
                <Form/>
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
                <Dialog.Button label='ACCEPT' onPress={handleAccept}/>
                <Dialog.Button label='DECLINE' onPress={handleDecline}/>
            </Dialog.Container>  
        </SafeAreaView>

    )
}

export default Login