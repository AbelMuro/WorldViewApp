import React from 'react';
import { SafeAreaView, ScrollView, Text, Dimensions, View } from 'react-native';
import Video from 'react-native-video';
import HeaderBar from '~/Components/HeaderBar';
import MenuBar from '~/Components/MenuBar';
import EnterComment from './EnterComment';
import CommentSection from './CommentSection';
import OtherVideos from './OtherVideos';
import {
    VideoTitle, 
    VideoUploaderImage, 
    VideoUploader, 
    Uploader,
    PostedOn
} from './styles.js';
import {useSelector} from 'react-redux';

function DisplayVideo() {
    const video = useSelector(state => state.video);


    return !video.title ? <></> : (
        <SafeAreaView>
            <HeaderBar back={true}/>
            <MenuBar/>
            <ScrollView style={{maxHeight: Dimensions.get('window').height - 140, minHeight: 200 }}>
                <View>
                    <Video
                        source={{uri: video.url}}
                        poster={video.thumbnail}
                        posterResizeMode='cover'
                        paused={true}
                        style={{width: '100%', height: 250}}
                        controls={true}
                        resizeMode='cover'
                    />                         
                </View>
                <VideoTitle>
                    {video.title}
                </VideoTitle>    
                <Uploader>
                    <VideoUploaderImage
                        source={{uri: video.userImage}}
                    />
                    <VideoUploader>
                        {video.username}
                    </VideoUploader>
                </Uploader>   
                <PostedOn>
                    <Text style={{fontWeight: 700}}>Posted on:</Text>   {video.timeCreated}
                </PostedOn>
                <EnterComment/>
                <CommentSection/>
                <OtherVideos/>
            </ScrollView>
        </SafeAreaView>
    )
}

export default DisplayVideo;