import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import {Button, ButtonText} from './styles.js';
import auth from '@react-native-firebase/auth';

function SignOutButton() {
    const [reload, setReload] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSignOut = () => {
        auth().signOut().then(() => {
            setReload(!reload)
            Alert.alert('You have signed out!');
        });
    }
    
    useEffect(() => {
        setIsLoggedIn(auth().currentUser);
    }, [reload])

    return isLoggedIn ? (
        <Button onPress={handleSignOut}>
            <ButtonText>
                Sign Out                            
            </ButtonText>
        </Button>
    ) : <></>
}

export default SignOutButton;