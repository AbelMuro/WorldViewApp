import React, {useEffect, useState} from 'react';
import { TouchableOpacity, View } from 'react-native';
import {Actions} from 'react-native-router-flux';
import {
    VideoContainer, 
    VideoTitle, 
    VideoThumbnail, 
    VideoOwnerImage,
    VideoOwner,
    PostedDate} from './styles.js';
import firestore from '@react-native-firebase/firestore';
import icons from '~/Common/Icons';

function Video({video, userID}) {
    const [userInfo, setUserInfo] = useState({})


    const handleVideo = () => {
        Actions.video({videoOwnerID: video.userID, videoID: video.videoID});
    }

    useEffect(() => {
        firestore().collection(`${userID}`).doc('userInfo').get().then((snapshot) => {
            setUserInfo(snapshot.data());
        });
    }, [userID])

    return(
        <VideoContainer key={video.videoID}>
            <TouchableOpacity onPress={handleVideo}>
                <VideoThumbnail
                    source={{uri: video.thumbnail}}/>                                        
            </TouchableOpacity>
            <VideoTitle>
                {video.title}
            </VideoTitle>
            <View style={{display: 'flex', gap: 10, flexDirection: 'row', alignItems: 'center'}}>
                <VideoOwnerImage
                    source={userInfo.imageURL ? {uri: userInfo.imageURL} : icons['emptyAvatar']}
                    resizeMode='cover' 
                    resizeMethod='resize'
                />
                <VideoOwner>
                    {userInfo.username}
                </VideoOwner>
            </View>
            <PostedDate>
                Posted on: {video.timeCreated}
            </PostedDate>
        </VideoContainer>
    )
}

export default Video;