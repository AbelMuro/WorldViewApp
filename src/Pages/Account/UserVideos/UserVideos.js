import React, {useEffect, useState} from 'react';
import UploadVideo from './UploadVideo';
import {
    AllVideos,
    VideoThumbnail,
    VideoContainer,
    VideoTitle,
    Message
} from './styles.js'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

function UserVideos() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        firestore().collection(`${auth().currentUser.uid}`).orderBy('order', 'desc')
            .onSnapshot((snapshot) => {
                let userVideos = [];
                snapshot.forEach((doc) => {
                    let video = doc.data();
                    if(!video.aboutMe)
                        userVideos.push({
                            thumbnail: video.thumbnail,
                            title: video.title
                        })
                })
            setVideos(userVideos);
            })
    }, [])

    return(
        <AllVideos>
            <UploadVideo/>
            {videos.length ? videos.map((video) => {
                return(
                    <VideoContainer key={video.videoID}>
                        <VideoThumbnail source={{uri: video.thumbnail}}/>   
                        <VideoTitle>
                            {video.title}
                        </VideoTitle>
                    </VideoContainer>
                )
            }) : <Message>You have no videos</Message>}
        </AllVideos>
    )
}

export default UserVideos;