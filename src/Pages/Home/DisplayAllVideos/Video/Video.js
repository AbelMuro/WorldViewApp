import React, {useEffect, useState} from 'react';
import { TouchableOpacity, View } from 'react-native';
import {Actions} from 'react-native-router-flux';
import {useDispatch} from 'react-redux';
import {
    VideoContainer, 
    VideoTitle, 
    VideoThumbnail, 
    VideoOwnerImage,
    VideoOwner,
    PostedDate} from './styles.js';
import firestore from '@react-native-firebase/firestore';

function Video({video, userID}) {
    const [userInfo, setUserInfo] = useState({})
    const dispatch = useDispatch();

    const handleVideo = () => {
        Actions.video();
        dispatch({type: 'UPDATE_VIDEO', video});
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
                    source={{uri: userInfo.imageURL}}
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