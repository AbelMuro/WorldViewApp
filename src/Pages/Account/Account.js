import React from 'react';
import UserInfo from './UserInfo';
import HeaderBar from '~/Components/HeaderBar';
import MenuBar from '~/Components/MenuBar'; 
import {Actions} from 'react-native-route-flux';

//this is where i left off
function Account() { 

    return(
        <>
            <HeaderBar back={true}/>
            <MenuBar/>
            <UserInfo/>
        </>
    )
}

export default Account;