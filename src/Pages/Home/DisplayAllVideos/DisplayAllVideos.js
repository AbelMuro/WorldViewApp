import React from 'react';
import {Text, View, ScrollView, TouchableOpacity} from 'react-native';
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
import {Actions} from 'react-native-router-flux';

function DisplayAllVideos() {
    const videosRef = collection(db, "developers collection/allVideos/videoCollection");
    const [videos, loading, error] = useCollectionData(videosRef);

    const handleVideo = (video) => {
        Actions.video(video)
    }
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
                                <TouchableOpacity onPress={() => handleVideo(video)}>
                                    <VideoThumbnail
                                        source={{uri: video.thumbnail}}/>                                        
                                </TouchableOpacity>
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

export default DisplayAllVideos;