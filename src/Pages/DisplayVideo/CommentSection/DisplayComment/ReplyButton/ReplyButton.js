import React, {useState, useEffect} from 'react';
import {Alert, ActivityIndicator} from 'react-native';
import Dialog from 'react-native-dialog';
import {
    Reply,
    ButtonText,
    LoadingContainer
} from './styles.js';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import uuid from 'react-native-uuid';

function ReplyButton({videoID, commentID, videoOwnerID}) {
    const [reply, setReply] = useState('');
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleReply = (text) => {
        if(text.length < 100)
            setReply(text);
    }

    const handleOpen = () => {
        if(!auth().currentUser){
            Alert.alert('You must be logged in to reply to a comment');
            return;
        }
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setReply('');
    }

    const handleSubmit = async () => {
        if(!reply) {
            Alert.alert('Please enter your reply');
            return;
        }
        try{
            setLoading(true);
            const currentDate = new Date();
            const millisecondsSince1970 = currentDate.getTime();
            const readableDate = currentDate.toLocaleDateString();
            const currentHour = ((currentDate.getHours() + 11) % 12 + 1);
            const currentMinutes = currentDate.getMinutes();
            const AmOrPm = currentDate.getHours() >= 12 ? "PM" : "AM";
            let replyID = uuid.v4();
            let repliesRef = firestore().collection(`${videoOwnerID}/${videoID}/commentSection/${commentID}/commentReplies`);
            await repliesRef.doc(replyID).set({
                comment: reply,
                commentID: replyID,
                order: millisecondsSince1970,
                timeStamp: `${readableDate} ${currentHour}:${currentMinutes} ${AmOrPm}`,
                userID: auth().currentUser.uid
            })
            setLoading(false);
            setOpen(false);
        }catch(error){
            console.log(error);
            setLoading(false);
        }
    }


    return(
        <>
            <Reply onPress={handleOpen}>
                <ButtonText>
                    Reply
                </ButtonText>
            </Reply>        
            <Dialog.Container visible={open}> 
                <Dialog.Title>
                    Enter Reply
                </Dialog.Title>
                {loading ? 
                    <LoadingContainer>
                        <ActivityIndicator side='medium'/> 
                    </LoadingContainer> : 
                    <Dialog.Input value={reply} onChangeText={handleReply} height={100} multiline={true}/>}
                <Dialog.Button label='Cancel' onPress={handleClose}/>
                <Dialog.Button label='Submit' onPress={handleSubmit}/>
            </Dialog.Container>   
        </>
    
    )
}

export default ReplyButton;