import React, {memo, lazy, useMemo, useState} from 'react';
import CircularLoadingBar from '~/Components/CircularLoadingBar';
import {
    Container,
    Title
} from './styles.js'
import { useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
const Video = lazy(() => import('./Video'));

function OtherVideos() {
    const video = useSelector(state => state.video.video);
    const [allVideos, setAllVideos] = useState([]);
    const [loading, setLoading] = useState(false);

    useMemo(() => {
        setLoading(true);
        let videos = [];
        const videoCollection = firestore().collection(`${video.userID}`);

        async function getVideos() {
            const snapshot = await videoCollection.get();

            snapshot.forEach((doc) => {
                const video = doc.data();
                const title = video.title;
                if(!title)                  //every account has a document called userInfo and a bunch of videos, we want to skip the userInfo doc
                    return; 
                else
                    videos.push(
                        <Video video={video} key={video.videoID}/>
                    )
            })
            setLoading(false);
            setAllVideos(videos);
        }
        getVideos();

    }, [video])


    return loading ? <CircularLoadingBar/> : (
        allVideos.length === 0 ? <></> : 
        <Container>
            <Title>
                Other videos by {video.username}
            </Title>
            {allVideos}
        </Container>
    )
}

export default memo(OtherVideos);