import React, {useEffect} from 'react';
import HeaderBar from '~/Components/HeaderBar';
import MenuBar from '~/Components/MenuBar'; 
import {Text} from 'react-native';
import {Actions} from 'react-native-route-flux';
import auth from '@react-native-firebase/auth';

//this is where i left off
function Account() {

    return(
        <>
            <HeaderBar back={true}/>
            <MenuBar/>
        </>
    )
}

export default Account;