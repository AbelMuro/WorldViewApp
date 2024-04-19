import React, {useEffect, useState} from 'react';
import { SafeAreaView, ScrollView, Text, Dimensions, View } from 'react-native';
import Video from 'react-native-video';
import HeaderBar from '~/Components/HeaderBar';
import MenuBar from '~/Components/MenuBar';
import EnterComment from './EnterComment';
import CommentSection from './CommentSection';
import OtherVideos from './OtherVideos';
import {
    VideoTitle, 
    VideoUploaderImage, 
    VideoUploader, 
    Uploader,
    PostedOn
} from './styles.js';
import firestore from '@react-native-firebase/firestore';
import icons from '~/Common/Icons';

function DisplayVideo({videoOwnerID, videoID}) {
    const [userInfo, setUserInfo] = useState({});
    const [video, setVideo] = useState(null);

    useEffect(() => {
        if(!video) return;
        firestore().collection(video.userID).doc('userInfo').get().then((snapshot) => {
            setUserInfo(snapshot.data());
        })
    }, [video])

    useEffect(() => {
        if(!videoOwnerID || !videoID) return;

        firestore().collection(videoOwnerID).doc(videoID).get().then((snapshot) => {
            setVideo(snapshot.data());
        })
    }, [videoOwnerID, videoID])

    return !video ? <></> : (
        <SafeAreaView>
            <HeaderBar back={true}/>
            <MenuBar/>
            <ScrollView style={{maxHeight: Dimensions.get('window').height - 140, minHeight: 200 }}>
                <View>
                    <Video
                        source={{uri: video.url}}
                        poster={video.thumbnail}
                        posterResizeMode='cover'
                        paused={true}
                        style={{width: '100%', aspectRatio: 1}}
                        controls={true}
                        resizeMode='contain'
                    />                         
                </View>
                <VideoTitle>
                    {video.title}
                </VideoTitle>    
                <Uploader>
                    <VideoUploaderImage
                        source={userInfo.imageURL ? {uri: userInfo.imageURL} : icons['emptyAvatar']}
                    />
                    <VideoUploader>
                        {userInfo.username}
                    </VideoUploader>
                </Uploader>   
                <PostedOn>
                    <Text style={{fontWeight: 700}}>Posted on:</Text>   {video.timeCreated}
                </PostedOn>
                <EnterComment/>
                <CommentSection videoOwnerID={video.userID} videoID={video.videoID}/>
                <OtherVideos videoOwnerID={video.userID}/>
            </ScrollView>
        </SafeAreaView>
    )
}

export default DisplayVideo;