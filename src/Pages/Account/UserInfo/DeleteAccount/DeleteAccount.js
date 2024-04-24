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
        let user = auth().currentUser;
        let uid = user.uid;

        let allVideos = await firestore().collection(uid).get();

        allVideos.forEach((video) => {
            console.log(video.id)
        });
        setOpen(!open);
    }

    const deleteReplies = async (videosID, commentID) => {
        let repliesRef = firestore().collection(`${videosID}/commentSection/${commentID}/commentReplies`);

        let allReplies = await repliesRef.get();
        allReplies.forEach((reply) => {
            reply.ref.delete();
        });
    }


    const deleteComments = async (videoID) => {
        let commentsRef = firestore().collection(`${videoID}/commentSection`);

        let allComments = await commentsRef.get();
        allComments.forEach(async (comment) => {
            await deleteReplies(videoID, comment.id)
            comment.ref.delete();
        });
    }

    const handleDelete = async () => {
        try{
            setOpen(false);
            let user = auth().currentUser;
            let uid = user.uid;
            Actions.login();    

            let developersVideos = firestore().collection('developers collection/video collection');

            //deleting all documents from collection
            let allVideos = await firestore().collection(uid).get();
            allVideos.forEach(async (video) => {
                await developersVideos.doc(video.id).delete();
                await deleteComments(video.id);
                video.ref.delete();
            });

            //deleting videos and images from storage
            let filesRef = storage().ref(uid);
            let files = await filesRef.listAll();
            files.items.forEach((file) => {
                file.delete();
            })

            //deleting the account
            await user.delete();            
            Alert.alert('Account has been deleted');
            setOpen(false);

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