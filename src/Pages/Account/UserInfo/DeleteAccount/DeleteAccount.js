import React, {useState} from 'react';
import {Alert} from 'react-native';
import Dialog from 'react-native-dialog';
import {Button, ButtonText} from './styles.js';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {Actions} from 'react-native-router-flux';

function DeleteAccount() {
    const [open, setOpen] = useState(false);

    const handleOpen = async () => {
        setOpen(!open);
    }

    const deleteReplies = async (uid, videoID, commentID) => {
        let repliesRef = firestore().collection(`${uid}/${videoID}/commentSection/${commentID}/commentReplies`);

        let allReplies = await repliesRef.get();
        allReplies.forEach((reply) => {
            reply.ref.delete();
        });
    }


    const deleteComments = async (uid, videoID) => {
        let commentsRef = firestore().collection(`${uid}/${videoID}/commentSection`);

        let allComments = await commentsRef.get();
        allComments.forEach(async (comment) => {
            await deleteReplies(uid, videoID, comment.id)
            comment.ref.delete();
        });
    }

    const handleDelete = async () => {
        try{
            setOpen(false);
            let user = auth().currentUser;
            let uid = user.uid;
            let developersVideos = firestore().collection('developers collection/allVideos/videoCollection');

            //deleting the account
            await user.delete();    

            //deleting all documents from collection
            let allVideos = await firestore().collection(uid).get();
            allVideos.forEach(async (video) => {
                if(video.id !== 'userInfo');
                    await developersVideos.doc(video.id).delete();
                if(video.id !== 'userInfo')
                    await deleteComments(uid, video.id);
                video.ref.delete();
            });

            //deleting videos and images from storage
            let filesRef = storage().ref(uid);
            let files = await filesRef.listAll();
            files.items.forEach((file) => {
                file.delete();
            })
            
            Actions.login();          
            Alert.alert('Account has been deleted');
            setOpen(false);
        }
        catch(error){
            if(error.code === 'auth/requires-recent-login'){
                Alert.alert('You must log in again before deleting your account');
                Actions.login();
            }
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