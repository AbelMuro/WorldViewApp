import React from 'react';
import MenuBar from '~/Components/MenuBar';
import HeaderBar from '~/Components/HeaderBar';
import Form from './Form';
import {
    RegisterContainer,
    RegisterTitle,
    RegisterDesc
} from './styles.js';

function Register() {
    return(
        <>
            <HeaderBar back={true}/>        
            <MenuBar/>
            <RegisterContainer>
                <RegisterTitle>
                    Create Account
                </RegisterTitle>
                <RegisterDesc>
                    Password must have at least one digit, 
                    one letter, one symbol, and must have 6 
                    or more characters
                </RegisterDesc>
                <Form/>
            </RegisterContainer>        
        </>

    )
}

export default Register;