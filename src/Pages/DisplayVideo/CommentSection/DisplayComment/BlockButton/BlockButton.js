import React, {useState} from 'react';
import {Alert} from 'react-native';
import {
    Button,
    ButtonText
} from './styles.js';
import Dialog from 'react-native-dialog';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

function BlockButton({userID}) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    }

    const handleBlock = async () => {
        if(!auth().currentUser){
            Alert.alert('You must be logged in to block a user');
            return;
        }
        const uid = auth().currentUser.uid;

        try{
            await firestore().collection(`${uid}/userInfo/BlockedUsers`).doc(userID).set({
                blockedUser: userID
            })
            Alert.alert('User has been blocked');
            setOpen(false);
        }
        catch(error){
            console.log(error)
        }
    }

    return(
        <>
            <Button onPress={handleOpen}> 
                <ButtonText>
                    Block
                </ButtonText>
            </Button>          
            <Dialog.Container visible={open}>
                <Dialog.Title>
                    Are you sure you want to block this user?
                </Dialog.Title>
                <Dialog.Button label='YES' onPress={handleBlock}/>
                <Dialog.Button label='NO' onPress={handleOpen}/>
            </Dialog.Container>
        </>

    )
}

export default BlockButton;