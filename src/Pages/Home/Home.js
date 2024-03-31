import React from 'react';
import {Text, View, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import HeaderBar from '~/Components/HeaderBar';
import MenuBar from '~/Components/MenuBar';
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

    const handleVideo = (video) => {
        Actions.video(video)
    }
    console.log(process.env)

    return(
        <SafeAreaView>
            <HeaderBar/>
            <MenuBar/>
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
        </SafeAreaView>

    )
}

export default Home;