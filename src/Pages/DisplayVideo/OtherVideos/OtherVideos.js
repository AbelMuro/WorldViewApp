import React, {memo, lazy} from 'react';
import CircularLoadingBar from '~/Components/CircularLoadingBar';
import {collection} from 'firebase/firestore';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {db} from '~/Firebase';
import {
    Container,
    Title
} from './styles.js'
import { useSelector } from 'react-redux';
const Video = lazy(() => import('./Video'));

function OtherVideos() {
    const video = useSelector(state => state.video);
    const videosRef = collection(db, `${video.userID}`);
    const [videos, loading, error] = useCollectionData(videosRef);


    return loading ? <CircularLoadingBar/> : (
        videos.length === 0 ? <></> : 
        <Container>
            <Title>
                Other videos by {video.username}
            </Title>
            {
                videos.map((video, i) => {
                    const title = video.title;
                    const thumbnail = video.thumbnail
                    if(!title || !thumbnail) return; //every account has a document called userInfo and a bunch of videos, we want to skip the userInfo doc

                    return(
                        <Video video={video} key={video.videoID}/>
                    )
                })
            }
        </Container>
    )
}

export default memo(OtherVideos);