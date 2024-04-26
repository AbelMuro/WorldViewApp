import React, {useState} from 'react';
import {Linking} from 'react-native';
import Dialog from 'react-native-dialog';
import { SvgXml } from 'react-native-svg';
import {
    Button,
    ButtonContainer
} from './styles.js';
import {flag} from './icons';
import firestore from '@react-native-firebase/firestore';

function FlagVideo({videoOwnerID, videoID}) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    }

    const handleFlag = async () => {
        let videoRef = firestore().collection(videoOwnerID).doc(videoID);
        await videoRef.update({
            isFlagged: true
        })
        let devEmail = 'abelmuro93@gmail.com';
        let subject = 'Video has been flagged'
        let body = `The owner ID of the video is ${videoOwnerID} and the video ID is ${videoID}`
        let mailtoUrl = `mailto:${devEmail}?subject=${subject}&body=${body}`;
        try{
            await Linking.openURL(mailtoUrl);
        } catch(error){
            console.log(error)
        }
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
                    This video contains obscene, indecent or offensive content that you find unsettling
                </Dialog.Description>
                <Dialog.Button label='YES' onPress={handleFlag}/>                
                <Dialog.Button label='NO' onPress={handleOpen}/>
            </Dialog.Container>
        </>
    )
}

export default FlagVideo;