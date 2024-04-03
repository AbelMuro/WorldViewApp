import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {
    VideoContainer,
    VideoThumbnail,
    VideoTitle
} from './styles.js'

function Video({video}) {

    const handleVideo = (video) => {
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