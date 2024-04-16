import React, {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator, Alert, Platform} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import Dialog from "react-native-dialog";
import {launchImageLibrary} from 'react-native-image-picker';
import Video from 'react-native-video';
import { 
    UploadVideoButton, 
    ButtonText, 
    TitleContainer,
    Title,
    LoadingContainer
} from './styles.js';


function UploadVideo() {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState(1);
    const [video, setVideo] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [keyboardDisplayed, setKeyboardDisplayed] = useState(false);

    const categories = [
        {
            id: 1,
            label: 'Funny',
            value: 'Funny',
            borderColor: Platform.OS === 'ios' ? 'white' : 'black',
            color: Platform.OS === 'ios' ? 'white' : 'black',
            labelStyle: Platform.OS === 'ios' ? {color: 'white'} : {color: 'black'}
        },
        {
            id: 2,
            label: 'Music',
            value: 'Music',
            borderColor: Platform.OS === 'ios' ? 'white' : 'black',
            color: Platform.OS === 'ios' ? 'white' : 'black',
            labelStyle: Platform.OS === 'ios' ? {color: 'white'} : {color: 'black'}
        },
        {
            id: 3,
            label: 'Sports',
            value: 'Sports',
            borderColor: Platform.OS === 'ios' ? 'white' : 'black',
            color: Platform.OS === 'ios' ? 'white' : 'black',
            labelStyle: Platform.OS === 'ios' ? {color: 'white'} : {color: 'black'}
        },
        {
            id: 4,
            label: 'News',
            value: 'News',
            borderColor: Platform.OS === 'ios' ? 'white' : 'black',
            color: Platform.OS === 'ios' ? 'white' : 'black',
            labelStyle: Platform.OS === 'ios' ? {color: 'white'} : {color: 'black'}
        },
        {
            id: 5,
            label: 'Other',
            value: 'Other',
            borderColor: Platform.OS === 'ios' ? 'white' : 'black',
            color: Platform.OS === 'ios' ? 'white' : 'black',
            labelStyle: Platform.OS === 'ios' ? {color: 'white'} : {color: 'black'}
        }
    ]

    const handleFocus = () => {
        setKeyboardDisplayed(true);
    }

    const handleBlur = () => {
        setKeyboardDisplayed(false);
    }

    const handleTitle = (text) => {
        setTitle(text);
    }

    const handleDialog = () => {
        setOpen(!open);
    }

    const handleCancel = () => {
        setVideo(null);
        setTitle('');
        setOpen(false);
    }

    const handleUpload = async () => {
        try{
            setUploading(true);
            const video = await launchImageLibrary({
                mediaType: 'video',
            });      
            if(video.didCancel) return;

            setVideo(video.assets[0]);
        }
        catch(error){
            if(error === 'camera_unavailable')
                Alert.alert('Camera is not available')
            else if(error = 'permission')
                Alert.alert("Please allow app to access images in permissions");
            console.log(error);
        }   
        finally{
            setUploading(false);
        }     
    }

    const handleSubmit = async () => {
        if(!video)
            Alert.alert('Please upload a video')
        if(!Title)
            Alert.alert('Please enter a title for the video');
    }

    useEffect(() => {
        console.log(video);
    }, [video])

    return(
        <>
            <UploadVideoButton onPress={handleDialog}>
                <ButtonText>
                    upload videos
                </ButtonText>
            </UploadVideoButton>   
                <Dialog.Container visible={open} style={{position: 'absolute'}}>
                    <Dialog.Title>
                        Upload Video
                    </Dialog.Title>
                    <Dialog.Input 
                        label={'Enter Title'} 
                        value={title} 
                        onChangeText={handleTitle} 
                        onFocus={handleFocus}
                        onBlur={handleBlur}/>  
                    {!keyboardDisplayed && 
                        <TitleContainer>
                            <Title style={Platform.OS === 'ios' ? {color: 'white'} : {color: 'black'}}>
                                Select Category
                            </Title>
                        </TitleContainer>}
                    {!keyboardDisplayed && 
                        <View style={{marginBottom: 20}}>
                            <RadioGroup 
                                radioButtons={categories} 
                                onPress={setCategory}
                                selectedId={category}
                            />                    
                        </View>}
                    {
                        uploading ? 
                            <LoadingContainer>
                                <ActivityIndicator size='medium' color='red'/>
                            </LoadingContainer> : 
                        video && !keyboardDisplayed && 
                            <Video 
                                source={{uri: video.uri}} 
                                paused={true} 
                                muted={true}
                                style={{width: '100%', height: 200, backgroundColor: 'black'}}/>
                    }
                    <Dialog.Button label='Cancel' onPress={handleCancel}/>
                    <Dialog.Button label='Upload' onPress={handleUpload}/>
                    <Dialog.Button label='Submit' onPress={handleSubmit}/>
                </Dialog.Container>


        </>

    )
}

export default UploadVideo;