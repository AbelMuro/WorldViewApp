import React from 'react';
import {Alert} from 'react-native';
import {Button, ButtonText} from './styles.js';
import {useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';

function SignOutButton() {
    const user = useSelector(state => state.user.user);

    const handleSignOut = () => {
        auth().signOut().then(() => Alert.alert('You have signed out!'));
     }
    return user && (
        <Button onPress={handleSignOut}>
            <ButtonText>
                Sign Out                            
            </ButtonText>
        </Button>
    )
}

export default SignOutButton;