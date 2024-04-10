import React from 'react';
import {Alert} from 'react-native';
import {Button, ButtonText} from './styles.js';
import auth from '@react-native-firebase/auth';

function SignOutButton() {

    const handleSignOut = () => {
        auth().signOut().then(() => Alert.alert('You have signed out!'));
     }
    return auth().currentUser && (
        <Button onPress={handleSignOut}>
            <ButtonText>
                Sign Out                            
            </ButtonText>
        </Button>
    )
}

export default SignOutButton;