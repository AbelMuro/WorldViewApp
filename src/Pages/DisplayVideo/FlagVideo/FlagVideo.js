import React, {useState} from 'react';
import {Alert} from 'react-native';
import Dialog from 'react-native-dialog';
import { SvgXml } from 'react-native-svg';
import {
    Button,
    ButtonContainer
} from './styles.js';
import {flag} from './icons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

function FlagVideo({videoOwnerID, videoID}) {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState('');

    const handleOpen = () => {
        if(!auth().currentUser){
            Alert.alert('You must be logged in to flag a video');
            return;
        }
        setOpen(!open);
    }

    const handleText = (text) => {
        setText(text);
    }

    const handleFlag = async () => {
        if(!text){
            Alert.alert('Please enter the reason for flagging');
            return;
        }

        //this is where i left off, 
        let vid = firestore().collection('developers collection/flaggedVideos/flaggedVideoCollection').doc(videoID);
        await vid.set({
            blockedVideo: videoID,
            userID: videoOwnerID,
            reason: text
        })

        Alert.alert('Video has been reported, please allow 24 hours for us to investigate');
        setOpen(false);
    }


    return(
        <>
            <ButtonContainer>
                <Button onPress={handleOpen}>
                    <SvgXml xml={flag} width='16px' height='16px'/>
                </Button>                  
            </ButtonContainer>
            <Dialog.Container visible={open}>
                <Dialog.Title>
                    Are you sure you want to flag this video for objectionable content?
                </Dialog.Title>
                <Dialog.Description>
                    What does this video contain that you find offensive or unsettling?
                </Dialog.Description>
                <Dialog.Input value={text} onChangeText={handleText} multiline={true} height={100}/>
                <Dialog.Button label='YES' onPress={handleFlag}/>                
                <Dialog.Button label='NO' onPress={handleOpen}/>
            </Dialog.Container>
        </>
    )
}

export default FlagVideo;