import React from 'react';
import {Header, Title, GoBackButton, LoginButton, AccountCircle, TitleContainer} from './styles.js';
import {Actions} from 'react-native-router-flux';
import {SvgXml} from 'react-native-svg';
import icons from './icons';
import auth from '@react-native-firebase/auth';

function HeaderBar({back}) {

    const handleGoBack = () => {
        Actions.pop({refresh: {}});
    }

    const handleHome = () => {
        Actions.home();
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
            <TitleContainer onPress={handleHome}>
                <Title>
                    world view
                </Title>                
            </TitleContainer>
            <LoginButton onPress={handleLogin}>
                <AccountCircle >
                    <SvgXml xml={icons['login']} width='15px' height='30px'/>
                </AccountCircle>                
            </LoginButton>

        </Header>
    )
}

export default HeaderBar;