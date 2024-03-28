import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
import Video from 'react-native-video';
import {Title, AllVideos, VideoContainer, VideoTitle} from './styles.js';
import {useCollectionData} from 'react-firebase-hooks/firestore';    
import {collection} from 'firebase/firestore';
import {ref as refSB, getDownloadURL} from "firebase/storage"; 
import {db, storage} from '~/Firebase';


function Home() {
    const videosRef = collection(db, "developers collection/allVideos/videoCollection");
    const [videos, loading, error] = useCollectionData(videosRef);

    const downloadVideo = async (userID, videoID) => {
        let reference =  refSB(storage, `${userID}/${videoID}`)
        let url = await getDownloadURL(reference);
        return url
    }

    const renderVideo = ({item}) => {
        
        let src = downloadVideo(item.userID, item.videoID); 
        return(
            <VideoContainer>
                <Video
                    source={item.url}
                    poster={item.thumbnail}
                    controls={true}
                    style={{width: 300, height: 170, borderRadius: 10}}
                />
                <VideoTitle>
                    {item.title}
                </VideoTitle>
            </VideoContainer>
        )
    }

    return(
        <>
            <Title>
                Enjoy the videos uploaded by our users!
            </Title>  
            {loading ? <Text> Loading...</Text> :       
                <AllVideos
                    data={videos}
                    renderItem={renderVideo}
                    contentContainerStyle={{justifyContent: 'center', alignItems: 'center', gap: '25px'}}
                />     
            }  
        </>
    )
}

export default Home;