import React, {useEffect} from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import Video from 'react-native-video';
import {Actions} from 'react-native-router-flux';
import HeaderBar from '~/Components/HeaderBar';
import MenuBar from '~/Components/MenuBar';
import EnterComment from './EnterComment';
import CommentSection from './CommentSection';
import {
    VideoTitle, 
    VideoUploaderImage, 
    VideoUploader, 
    Uploader,
    PostedOn
} from './styles.js';

function DisplayVideo({url, thumbnail, title, userImage, username, timeCreated, userID, videoID}) {

    useEffect(() => {
        if(!url)
            Actions.pop();
    }, [url])

    return(
        <SafeAreaView>
            <HeaderBar/>
            <MenuBar/>
            <ScrollView>
                <Video
                    source={{uri: url}}
                    poster={thumbnail}
                    posterResizeMode='cover'
                    paused={true}
                    style={{width: '100%', height: 250}}
                    controls={true}
                    resizeMode='cover'
                />         
                <VideoTitle>
                    {title}
                </VideoTitle>    
                <Uploader>
                    <VideoUploaderImage
                        source={{uri: userImage}}
                    />
                    <VideoUploader>
                        {username}
                    </VideoUploader>
                </Uploader>   
                <PostedOn>
                    <Text style={{fontWeight: 700}}>Posted on:</Text>   {timeCreated}
                </PostedOn>
                <EnterComment userID={userID} videoID={videoID}/>
                <CommentSection/>
            </ScrollView>
        </SafeAreaView>
    )
}

export default DisplayVideo;