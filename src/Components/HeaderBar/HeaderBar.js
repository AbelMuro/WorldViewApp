import React from 'react';
import {Header, Title, GoBackButton, LoginButton} from './styles.js';
import {Actions} from 'react-native-router-flux';
import {SvgXml} from 'react-native-svg';
import icons from './icons';
import {useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';

function HeaderBar({back}) {

    const handleGoBack = () => {
        Actions.pop();
    }

    const handleLogin = () => {
        if(auth().currentUser)
            Actions.account();
        else
            Actions.login();
    }

    return(
        <Header>
            {back && 
                <GoBackButton onPress={handleGoBack}>
                    <SvgXml xml={icons['arrow']} width='30px' height='20px'/>
                </GoBackButton>}
            <Title>
                world view
            </Title>
            <LoginButton onPress={handleLogin}>
                <SvgXml xml={icons['login']} width='15px' height='30px'/>
            </LoginButton>
        </Header>
    )
}

export default HeaderBar;