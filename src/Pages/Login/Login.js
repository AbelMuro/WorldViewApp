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
} from './styles.js'
import {auth} from '~/Firebase';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

function Login() {

    const handleRegister = () => {

    } 

    const handleGoogleLogin = async () => {
        GoogleSignin.configure();

        try{
            await GoogleSignin.hasPlayServices();    
            const userInfo = await GoogleSignin.signIn();  
            console.log(userInfo);
        }
        catch(error){
            console.log(error)
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