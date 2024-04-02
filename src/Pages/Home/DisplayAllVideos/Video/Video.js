import React from 'react';
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

function Video({video}) {
    const dispatch = useDispatch();

    const handleVideo = () => {
        Actions.video();
        dispatch({type: 'UPDATE_VIDEO', video});
    }

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
                    source={{uri: video.userImage}}
                />
                <VideoOwner>
                    {video.username}
                </VideoOwner>
            </View>
            <PostedDate>
                Posted on: {video.timeCreated}
            </PostedDate>
        </VideoContainer>
    )
}

export default Video;