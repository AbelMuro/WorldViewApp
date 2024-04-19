import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native'
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
import {Actions} from 'react-native-router-flux';
import { useDispatch } from 'react-redux';

function UserVideos() {
    const dispatch = useDispatch();
    const [videos, setVideos] = useState([]);

    const handleVideo = (video) => {
        Actions.video({videoOwnerID: video.userID, videoID: video.videoID});
    }

    useEffect(() => {
        firestore().collection(`${auth().currentUser.uid}`).orderBy('order', 'desc')
            .onSnapshot((snapshot) => {
                let userVideos = [];
                snapshot.forEach((doc) => {
                    let video = doc.data();
                    if(!video.aboutMe)
                        userVideos.push(video);
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
                        <TouchableOpacity onPress={() => handleVideo(video)}>
                            <VideoThumbnail source={{uri: video.thumbnail}}/>                              
                        </TouchableOpacity>
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