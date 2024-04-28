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

        //this is where i left off, i will need to log in with google somehow here
        try {
            const response = await fetch('https://www.googleapis.com/gmail/v1/users/abel-muro@world-view-videos.iam.gserviceaccount.com/messages/send', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        raw: 'BASE64_ENCODED_EMAIL_CONTENT', 
                    }),
                    });
            const result = await response.json();
            console.log('Email sent:', result);
        } catch (error) {
            console.error('Error sending email:', error);
        }

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