import React from 'react';
import {Header, Title, GoBackButton} from './styles.js';
import {Actions} from 'react-native-router-flux';
import {SvgXml} from 'react-native-svg';
import icons from './icons';

function HeaderBar({back}) {

    const handleGoBack = () => {
        Actions.pop();
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
        </Header>
    )
}

export default HeaderBar;