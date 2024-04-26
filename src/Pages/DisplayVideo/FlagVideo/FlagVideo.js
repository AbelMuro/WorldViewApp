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
import RNSmtpMailer from 'react-native-smtp-mailer';

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
        let videoRef = firestore().collection(videoOwnerID).doc(videoID);
        await videoRef.update({
            isFlagged: true
        });

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
                <Dialog.Input value={text} onChangeText={handleText}/>
                <Dialog.Button label='YES' onPress={handleFlag}/>                
                <Dialog.Button label='NO' onPress={handleOpen}/>
            </Dialog.Container>
        </>
    )
}

export default FlagVideo;