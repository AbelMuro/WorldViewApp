import React, {lazy, useMemo, useState} from 'react';
import {ScrollView, Dimensions} from 'react-native';
import LoadingScreen from '~/Components/LoadingScreen';
import CircularLoadingBar from '~/Components/CircularLoadingBar';
import {Title, 
    AllVideos} from './styles.js';
import firestore from '@react-native-firebase/firestore';
const Video = lazy(() => import('./Video'));

function DisplayAllVideos({category}) {
    const [loading, setLoading] = useState(false);
    const [allVideos, setAllVideos] = useState([]);

    useMemo(() => {
        setLoading(true);        
        let videos = [];
        let videoCollection;
        if(category && category !== 'All')
            videoCollection = firestore().collection('developers collection/allVideos/videoCollection').where('category', '==', category);
        else
            videoCollection = firestore().collection('developers collection/allVideos/videoCollection').orderBy('order', 'desc');

        async function getVideos() {
            const snapshot = await videoCollection.get();
            snapshot.forEach((doc) => {
                let video = doc.data();
                videos.push(
                    <Video video={video} key={video.videoID} userID={video.userID}/>   
                )                    
            })
            setAllVideos(videos);
            setLoading(false);
        }

        getVideos();
    }, [category])



    return(            
        <ScrollView style={{maxHeight: Dimensions.get('window').height - 150, minHeight: 200}}>
            <Title>
                Enjoy the videos uploaded by our users!
            </Title>  
            {loading ? <CircularLoadingBar/>:    
                <AllVideos>
                    {allVideos}
                </AllVideos>  
            }  
        </ScrollView>  
    )
}

export default DisplayAllVideos;