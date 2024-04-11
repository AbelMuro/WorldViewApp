import React, {useState} from 'react';
import {Alert} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker'
import { UpdateAccountButton, ButtonText } from './styles.js';
import Dialog from "react-native-dialog";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

//remember to update permissions for android
function UpdateAccount({username, aboutme}) {
    const [open, setOpen] = useState(false);
    const [newUserName, setNewUserName] = useState(username);
    const [newAboutMe, setNewAboutMe] = useState(aboutme);
    const [newImage, setNewImage] = useState(null);

    const handleUsername = (text) => {
        setNewUserName(text);
    }

    const handleAboutme = (text) => {
        setNewAboutMe(text);
    }

    const handleUpload = async () => {
        try{
            const image = await launchImageLibrary({
                mediaType: 'photo',
            });          
            let imageObject = image.assets[0];
            
            const imageRef = storage().ref(`/${auth().currentUser.uid}/${imageObject.fileName}`);           //need to figure this out
            console.log(imageRef);
            //imageRef.putFile(`${auth().currentUser.uid}/`)


        }
        catch(error){
            if(error === 'camera_unavailable')
                Alert.alert('Camera is not available')
            else if(error = 'permission')
                Alert.alert("App doesn't have permission to access images");
            console.log(error);
        }
    }

    const handleDialog = () => {
        setOpen(!open);
    }
    
    const handleAccount = async () => {
        let userInfoDoc = firestore().collection(`${auth().currentUser.uid}`).doc('userInfo');
        await userInfoDoc.update({
            username: newUserName,
            aboutMe: newAboutMe
        })
        setOpen(false);
    }

    return(
        <>
            <UpdateAccountButton onPress={handleDialog}>
                <ButtonText>
                    Update Account
                </ButtonText>
            </UpdateAccountButton>        
            <Dialog.Container visible={open}>
                <Dialog.Title>Update Account</Dialog.Title>
                <Dialog.Input value={newUserName} onChangeText={handleUsername} label='Username'/>
                <Dialog.Input value={newAboutMe} onChangeText={handleAboutme} label='About Me' />
                <Dialog.Button label='Upload' onPress={handleUpload}/>
                <Dialog.Button label="Cancel" onPress={handleDialog}/>
                <Dialog.Button label="Update" onPress={handleAccount}/>
            </Dialog.Container>
        </>

    )
}

export default UpdateAccount;