import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {
    VideoContainer,
    VideoThumbnail,
    VideoTitle
} from './styles.js'
import {useDispatch} from 'react-redux';

function Video({video}) {
    const dispatch = useDispatch();

    const handleVideo = (video) => {
        dispatch({type: 'UPDATE_VIDEO', video});
        Actions.video(video)
    }

    return(
        <TouchableOpacity onPress={() => handleVideo(video)}>
            <VideoContainer>
                <VideoThumbnail 
                    source={{uri: video.thumbnail}}
                />
                <VideoTitle>
                    {video.title}
                </VideoTitle>
            </VideoContainer>                            
        </TouchableOpacity>
    )
}

export default Video;