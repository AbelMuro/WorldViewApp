import React, {memo, lazy, useMemo, useState, useEffect} from 'react';
import CircularLoadingBar from '~/Components/CircularLoadingBar';
import {
    Container,
    Title
} from './styles.js'
import { useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
const Video = lazy(() => import('./Video'));

function OtherVideos({videoOwnerID}) {
    const [allVideos, setAllVideos] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(false);

    useMemo(() => {
        setLoading(true);
        let videos = [];
        const videoCollection = firestore().collection(`${videoOwnerID}`).orderBy('order', 'desc');

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

    }, [videoOwnerID])

    useEffect(() => {
        firestore().collection(`${videoOwnerID}`).doc('userInfo').get().then((snapshot) => {
            setUserInfo(snapshot.data());
        });
    }, [videoOwnerID])


    return loading ? <CircularLoadingBar/> : (
        allVideos.length === 0 ? <></> : 
        <Container>
            <Title>
                Other videos by {userInfo.username}
            </Title>
            {allVideos}
        </Container>
    )
}

export default memo(OtherVideos);