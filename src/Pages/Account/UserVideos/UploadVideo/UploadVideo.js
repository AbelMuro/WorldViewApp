import React, {useState, useEffect, useRef} from 'react';
import {View, Text, ActivityIndicator, Alert, Platform, Image} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import Dialog from "react-native-dialog";
import {launchImageLibrary} from 'react-native-image-picker';
import { createThumbnail } from "react-native-create-thumbnail";            //requires certain permission on android, look up documentation for this
import uuid from 'react-native-uuid';
import { 
    UploadVideoButton, 
    ButtonText, 
    TitleContainer,
    Title,
    LoadingContainer,
    UploadedFileContainer,
    UploadedFileName
} from './styles.js';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';


function UploadVideo() {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Funny');
    const [video, setVideo] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [keyboardDisplayed, setKeyboardDisplayed] = useState(false);
    const [loading, setLoading] = useState(false);

    const categories = [
        {
            id: 'Funny',
            label: 'Funny',
            value: 'Funny',
            borderColor: Platform.OS === 'ios' ? 'white' : 'black',
            color: Platform.OS === 'ios' ? 'white' : 'black',
            labelStyle: Platform.OS === 'ios' ? {color: 'white'} : {color: 'black'}
        },
        {
            id: 'Music',
            label: 'Music',
            value: 'Music',
            borderColor: Platform.OS === 'ios' ? 'white' : 'black',
            color: Platform.OS === 'ios' ? 'white' : 'black',
            labelStyle: Platform.OS === 'ios' ? {color: 'white'} : {color: 'black'}
        },
        {
            id: 'Sports',
            label: 'Sports',
            value: 'Sports',
            borderColor: Platform.OS === 'ios' ? 'white' : 'black',
            color: Platform.OS === 'ios' ? 'white' : 'black',
            labelStyle: Platform.OS === 'ios' ? {color: 'white'} : {color: 'black'}
        },
        {
            id: 'News',
            label: 'News',
            value: 'News',
            borderColor: Platform.OS === 'ios' ? 'white' : 'black',
            color: Platform.OS === 'ios' ? 'white' : 'black',
            labelStyle: Platform.OS === 'ios' ? {color: 'white'} : {color: 'black'}
        },
        {
            id: 'Other',
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
        if(!video){
            Alert.alert('Please upload a video');
            return;
        }
        if(!title){
            Alert.alert('Please enter a title for the video');
            return;
        }
        setLoading(true);
        try{
            //creating a date object that has the current date formatted
            const currentDate = new Date();
            const millisecondsSince1970 = currentDate.getTime();
            const readableDate = currentDate.toLocaleDateString();
            const currentHour = ((currentDate.getHours() + 11) % 12 + 1);
            let currentMinutes = currentDate.getMinutes();
            currentMinutes = currentMinutes.toString().length == 1 ? `0${currentMinutes}` : currentMinutes;
            const AmOrPm = currentDate.getHours() >= 12 ? "PM" : "AM";

            //uploading thumbnail to storage
            const thumbnailName = thumbnail.path.slice(thumbnail.path.lastIndexOf('/') + 1, thumbnail.path.length);
            const reference = storage().ref(`${auth().currentUser.uid}/${thumbnailName}`);    
            await reference.putFile(thumbnail.path);
            let thumbnailUrl = await storage().ref(`${auth().currentUser.uid}/${thumbnailName}`).getDownloadURL();

            //uploading video to storage
            const imageRef = storage().ref(`${auth().currentUser.uid}/${video.fileName}`);
            await imageRef.putFile(video.uri);
            let videoUrl = await storage().ref(`${auth().currentUser.uid}/${video.fileName}`).getDownloadURL();

            //creating a document for the video
            const collectionRef = firestore().collection(`${auth().currentUser.uid}`);
            let userInfo = await collectionRef.doc('userInfo').get();
            userInfo = userInfo.data();
            let videoID = uuid.v4();
            await collectionRef.doc(videoID).set({
                category: category,
                thumbnail: thumbnailUrl, 
                title: title,
                searchTitle: title.toLowerCase(),
                username: userInfo.username,
                userImage: userInfo.imageURL,
                order: millisecondsSince1970,
                userID: auth().currentUser.uid,
                timeCreated: `${readableDate} ${currentHour}:${currentMinutes} ${AmOrPm}`,
                videoID: videoID,
                url: videoUrl,
                isHeightBiggerThanWidth: video.height > video.width,
                resolution: video.height
            })

            //adding the video to the developers collection
            const developersRef = firestore().collection('developers collection/allVideos/videoCollection');
            await developersRef.doc(videoID).set({
                category: category,
                thumbnail: thumbnailUrl, 
                title: title,
                searchTitle: title.toLowerCase(),
                username: userInfo.username,
                userImage: userInfo.imageURL,
                order: millisecondsSince1970,
                userID: auth().currentUser.uid,
                timeCreated: `${readableDate} ${currentHour}:${currentMinutes} ${AmOrPm}`,
                videoID: videoID,
                url: videoUrl,
                isHeightBiggerThanWidth: video.height > video.width,
                resolution: video.height
            })

            setLoading(false);
            handleCancel();
            Alert.alert('Video has been successfully uploaded');
            
        }
        catch(error){
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        if(!video) return;

        async function getThumbnail() {
            try{
                const { path, width, height } = await createThumbnail({
                    url: video.uri,
                    timeStamp: 100,
                  })  
                setThumbnail({path, width, height});                
            }
            catch(error){
                console.log(error);
            }  
        }
        getThumbnail();
    }, [video])

    useEffect(() => {
        if(!video) return;
        console.log(video.height > video.width);
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
                    {loading && 
                        <Dialog.Description>
                            Video may take some time to upload
                        </Dialog.Description>
                    }
                    {!loading && <Dialog.Input 
                        label={'Enter Title'} 
                        value={title} 
                        onChangeText={handleTitle} 
                        onFocus={handleFocus}
                        onBlur={handleBlur}/> } 
                    {!keyboardDisplayed && !loading &&
                        <TitleContainer>
                            <Title style={Platform.OS === 'ios' ? {color: 'white'} : {color: 'black'}}>
                                Select Category
                            </Title>
                        </TitleContainer>}
                    {!keyboardDisplayed && !loading &&  
                        <View style={{marginBottom: 20}}>
                            <RadioGroup 
                                radioButtons={categories} 
                                onPress={setCategory}
                                selectedId={category}
                            />                    
                        </View>}
                    {uploading ? 
                            <LoadingContainer>
                                <ActivityIndicator size='medium' color='red'/>
                            </LoadingContainer> : 
                        video && !keyboardDisplayed && !loading &&
                        <UploadedFileContainer>
                           <UploadedFileName style={Platform.OS === 'ios' ? {color: 'white'} : {color: 'black'}}>
                                {video.fileName}
                           </UploadedFileName>                            
                        </UploadedFileContainer>
                    }
                    {loading && 
                        <LoadingContainer>
                            <ActivityIndicator size='medium' color='red'/>
                        </LoadingContainer>}
                    <Dialog.Button label='Cancel' onPress={handleCancel} disable={loading}/>
                    <Dialog.Button label='Upload' onPress={handleUpload} disable={loading}/>
                    <Dialog.Button label='Submit' onPress={handleSubmit} disable={loading}/>
                </Dialog.Container>


        </>

    )
}

export default UploadVideo;