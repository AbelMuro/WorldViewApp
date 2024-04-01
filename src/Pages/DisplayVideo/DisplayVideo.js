import React, {useEffect} from 'react';
import { SafeAreaView, ScrollView, Text, Dimensions, View } from 'react-native';
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


//now i need to create the 'other videos' for the user

function DisplayVideo({url, thumbnail, title, userImage, username, timeCreated, userID, videoID}) {

    useEffect(() => {
        if(!url)
            Actions.pop();
    }, [url])

    return(
        <SafeAreaView>
            <HeaderBar back={true}/>
            <MenuBar/>
            <ScrollView style={{maxHeight: Dimensions.get('window').height - 140, minHeight: 200 }}>
                <View>
                    <Video
                        source={{uri: url}}
                        poster={thumbnail}
                        posterResizeMode='cover'
                        paused={true}
                        style={{width: '100%', height: 250}}
                        controls={true}
                        resizeMode='cover'
                    />                         
                </View>
                   
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
                <CommentSection userID={userID} videoID={videoID}/>
            </ScrollView>
        </SafeAreaView>
    )
}

export default DisplayVideo;