import React, {lazy} from 'react';
import {ScrollView, Dimensions} from 'react-native';
import LoadingScreen from '~/Components/LoadingScreen';
import CircularLoadingBar from '~/Components/CircularLoadingBar';
import {Title, 
    AllVideos} from './styles.js';
import {useCollectionData} from 'react-firebase-hooks/firestore';    
import {collection, query, where} from 'firebase/firestore';
import {db} from '~/Firebase';
const Video = lazy(() => import('./Video'));

function DisplayAllVideos({category}) {
    const videosRef = collection(db, "developers collection/allVideos/videoCollection");
    const q = category && query(videosRef, where('category', '==', category))
    const [videos, loading, error] = useCollectionData(category ? (category !== 'All' ? q : videosRef) : videosRef);


    return(            
        <ScrollView style={{maxHeight: Dimensions.get('window').height - 150, minHeight: 200}}>
            <Title>
                Enjoy the videos uploaded by our users!
            </Title>  
            {loading ? <CircularLoadingBar/>:    
                <AllVideos>
                    {videos.map((video) => {
                        return (
                            <Video video={video} key={video.videoID}/>
                        )
                    })}                   
                </AllVideos>  
            }  
        </ScrollView>  
    )
}

export default DisplayAllVideos;