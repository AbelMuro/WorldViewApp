import React from 'react';
import HeaderBar from '~/Components/HeaderBar';
import MenuBar from '~/Components/MenuBar';
import Form from './Form';
import {
    LoginContainer,
    LoginTitle
} from './styles.js'

function Login() {
    return(
        <>
            <HeaderBar/>
            <MenuBar/>
            <LoginContainer>
                <LoginTitle>
                    Log in with your email and password
                </LoginTitle>
                <Form/>
            </LoginContainer>        
        </>

    )
}

export default Login