import React from 'react';
import {Text, View, ScrollView} from 'react-native';
import {Title, 
    AllVideos, 
    VideoContainer, 
    VideoTitle, 
    VideoThumbnail, 
    VideoOwnerImage,
    VideoOwner,
    PostedDate} from './styles.js';
import {useCollectionData} from 'react-firebase-hooks/firestore';    
import {collection} from 'firebase/firestore';
import {db} from '~/Firebase';


function Home() {
    const videosRef = collection(db, "developers collection/allVideos/videoCollection");
    const [videos, loading, error] = useCollectionData(videosRef);

    return(
        <ScrollView>
            <Title>
                Enjoy the videos uploaded by our users!
            </Title>  
            {loading ? <Text> Loading...</Text> :    
                <AllVideos>
                    {videos.map((video) => {
                        return (
                            <VideoContainer key={video.videoID}>
                                <VideoThumbnail
                                    source={{uri: video.thumbnail}}/>
                                <VideoTitle>
                                    {video.title}
                                </VideoTitle>
                                <View style={{display: 'flex', gap: 10, flexDirection: 'row', alignItems: 'center'}}>
                                    <VideoOwnerImage
                                        source={{uri: video.userImage}}
                                    />
                                    <VideoOwner>
                                        {video.username}
                                    </VideoOwner>
                                </View>
                                <PostedDate>
                                    Posted on: {video.timeCreated}
                                </PostedDate>
                            </VideoContainer>
                        )
                    })}                   
                </AllVideos>  
            }  
        </ScrollView>
    )
}

export default Home;