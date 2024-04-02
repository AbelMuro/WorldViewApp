import React, {memo} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import CircularLoadingBar from '~/Components/CircularLoadingBar';
import {Actions} from 'react-native-router-flux';
import {collection} from 'firebase/firestore';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {db} from '~/Firebase';
import {
    Container,
    Title,
    VideoContainer,
    VideoThumbnail,
    VideoTitle
} from './styles.js'
import { useSelector } from 'react-redux';

function OtherVideos() {
    const video = useSelector(state => state.video);
    const videosRef = collection(db, `${video.userID}`);
    const [videos, loading, error] = useCollectionData(videosRef);

    const handleVideo = (video) => {
        Actions.video(video)
    }

    return loading ? <CircularLoadingBar/> : (
        videos.length === 0 ? <></> : <Container>
            <Title>
                Other videos by {video.username}
            </Title>
            {
                videos.map((video, i) => {
                    const title = video.title;
                    const thumbnail = video.thumbnail
                    if(!title || !thumbnail) return(<></>); //every account has a document called userInfo and a bunch of videos, we want to skip the userInfo doc

                    return(
                        <TouchableOpacity onPress={() => handleVideo(video)}>
                            <VideoContainer key={i}>
                                <VideoThumbnail 
                                    source={{uri: thumbnail}}
                                />
                                <VideoTitle>
                                    {title}
                                </VideoTitle>
                            </VideoContainer>                            
                        </TouchableOpacity>
                    )
                })
            }
        </Container>
    )
}

export default memo(OtherVideos);