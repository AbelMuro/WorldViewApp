import React from 'react';
import {Alert} from 'react-native';
import {Button, ButtonText} from './styles.js';
import auth from '@react-native-firebase/auth';
import {useSelector} from 'react-redux';

function SignOutButton() {
    const isLoggedIn = useSelector(state => state.login.isLoggedIn);

    const handleSignOut = () => {
        auth().signOut().then(() => Alert.alert('You have signed out!'));
     }
    return isLoggedIn ? (
        <Button onPress={handleSignOut}>
            <ButtonText>
                Sign Out                            
            </ButtonText>
        </Button>
    ) : <></>
}

export default SignOutButton;