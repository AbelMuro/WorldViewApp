import React, {lazy} from 'react';
import {ScrollView} from 'react-native';
import LoadingScreen from '~/Components/LoadingScreen';
import CircularLoadingBar from '~/Components/CircularLoadingBar';
import {Title, 
    AllVideos} from './styles.js';
import {useCollectionData} from 'react-firebase-hooks/firestore';    
import {collection} from 'firebase/firestore';
import {db} from '~/Firebase';
const Video = lazy(() => import('./Video'));

function DisplayAllVideos() {
    const videosRef = collection(db, "developers collection/allVideos/videoCollection");
    const [videos, loading, error] = useCollectionData(videosRef);


    return(            
        <ScrollView>
            <Title>
                Enjoy the videos uploaded by our users!
            </Title>  
            {loading ? <CircularLoadingBar/>:    
                <AllVideos>
                    {videos.map((video) => {
                        return (
                            <Video video={video}/>
                        )
                    })}                   
                </AllVideos>  
            }  
        </ScrollView>  
    )
}

export default DisplayAllVideos;