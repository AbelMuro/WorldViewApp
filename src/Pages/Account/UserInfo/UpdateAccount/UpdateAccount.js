import React, {useState} from 'react';
import {Alert, ActivityIndicator, View, Image} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker'
import { 
    UpdateAccountButton, 
    ButtonText, 
    UploadedImageContainer,
    LoadingContainer } from './styles.js';
import Dialog from "react-native-dialog";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import {Actions} from 'react-native-router-flux';

function UpdateAccount({username, aboutme}) {
    const [open, setOpen] = useState(false);
    const [newUserName, setNewUserName] = useState(username);
    const [newAboutMe, setNewAboutMe] = useState(aboutme);
    const [newImage, setNewImage] = useState(null);
    const [loading, setLoading] = useState(false);

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
            if(image.didCancel) return;
            let imageObject = image.assets[0];
            setNewImage(imageObject);
        }
        catch(error){
            if(error === 'permission')
                Alert.alert("App doesn't have permission to access images");
            console.log(error);
        }
    }

    const handleDialog = () => {
        if(!auth().currentUser) {
            Actions.login();
            return;
        }
        setOpen(!open);
    }

    const handleCancel = () => {
        setNewUserName(username);
        setNewAboutMe(aboutme);
        setNewImage(null);
        setOpen(false);
    }
    
    const handleAccount = async () => {
        setLoading(true);
        try{
            let url = null;           
            let userInfoDoc = firestore().collection(`${auth().currentUser.uid}`).doc('userInfo');     
            if(newImage) {
                const imageRef = storage().ref(`${auth().currentUser.uid}/${newImage.fileName}`);         
                await imageRef.putFile(newImage.uri);      
                url = await storage().ref(`${auth().currentUser.uid}/${newImage.fileName}`).getDownloadURL();          
            } 
            let accountInfo = {
                username: newUserName,
                aboutMe: newAboutMe,
            }
            if(url)
                accountInfo.imageURL = url;
            await userInfoDoc.update(accountInfo);
            setOpen(false);      
        }
        catch(error){
            if(error === 'permission')
                Alert.alert("App doesn't have permission to access images");
            console.log(error);
        }
        finally{
            setLoading(false);
        }
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
                {!loading && <Dialog.Description>
                    Press upload to select a new photo
                </Dialog.Description>}
                {!loading && <Dialog.Input value={newUserName} onChangeText={handleUsername} label='Username'/>}
                {!loading && <Dialog.Input value={newAboutMe} onChangeText={handleAboutme} label='About Me'/>}
                {loading && 
                    <LoadingContainer> 
                        <ActivityIndicator size='large' color='red'/>
                    </LoadingContainer>}
                {newImage && !loading && 
                    <UploadedImageContainer>
                        <Image source={{uri: newImage.uri}} style={{width: 100, height: 100, borderRadius: 100}}/>
                    </UploadedImageContainer>
                }
                {!loading && <Dialog.Button label='Upload' onPress={handleUpload}/>}
                {!loading && <Dialog.Button label="Cancel" onPress={handleCancel}/>}
                {!loading && <Dialog.Button label="Update" onPress={handleAccount} />}
            </Dialog.Container>
        </>

    )
}

export default UpdateAccount;