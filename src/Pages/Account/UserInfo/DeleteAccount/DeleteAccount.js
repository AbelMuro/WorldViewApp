import React, {useState} from 'react';
import {Alert} from 'react-native';
import Dialog from 'react-native-dialog';
import {Button, ButtonText} from './styles.js';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Actions} from 'react-native-router-flux';

function DeleteAccount() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    }

    const handleDelete = async () => {
        try{
            let user = auth().currentUser;
            let uid = user.uid;
            //deleting collection in firestore
            let allVideosRef = await firestore().collection(uid).get();
            await Promise.all(allVideosRef.docs.map((d) => d.ref.delete()))
            //deleting videos and images in storage
            const storageRef = firebase.storage().ref(uid);
            await storageRef.delete();
            //deleting the account
            await user.delete();            
            Alert.alert('Account has been deleted');
            Actions.login();
        }
        catch(error){
            console.log(error);
        }
    }

    return(
        <>
            <Button onPress={handleOpen}>
                <ButtonText>
                    Delete Account
                </ButtonText>
            </Button>    
            <Dialog.Container visible={open}>
                <Dialog.Title>
                    Are you sure you want to delete your account?
                </Dialog.Title>
                <Dialog.Description>
                    All your videos, comments and replies will be deleted as well
                </Dialog.Description>
                <Dialog.Button label='YES' onPress={handleDelete}/>
                <Dialog.Button label='NO' onPress={handleOpen}/>
            </Dialog.Container>    
        </>

    )
}

export default DeleteAccount;