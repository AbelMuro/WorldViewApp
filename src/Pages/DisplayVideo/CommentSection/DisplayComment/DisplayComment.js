import React, {useEffect, useState, memo} from 'react';
import {View} from 'react-native';
import {
    Container,
    CommentContainer,
    CommentOwnerImage,
    CommentOwnerName,
    Comment,
    TimeStamp,
} from './styles.js';
import CommentReplies from './CommentReplies';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import ReplyButton from './ReplyButton';
import BlockButton from '~/Components/BlockButton';
import icons from '~/Common/Icons';

function DisplayComment({comment, userID, videoID, videoOwnerID}) {
    const [userInfo, setUserInfo] = useState({});
    const timeStamp = comment.timeStamp
    const commentID = comment.commentID;
    const currentComment = comment.comment;

    useEffect(() => {
        firestore().collection(userID).doc('userInfo').get().then((snapshot) => {
            setUserInfo(snapshot.data());
        })
    }, [userID])

    return (                        
        <Container>
            <CommentContainer>
                <View style={{width: '50px', display: 'flex', gap: 15}}>
                    <CommentOwnerImage
                        source={userInfo && userInfo.imageURL ? {uri: userInfo.imageURL} : icons['emptyAvatar']}
                        resizeMode='cover' 
                        resizeMethod='resize'
                    />
                    <CommentOwnerName>
                        {userInfo && userInfo.username}
                    </CommentOwnerName>                                
                </View>
                <Comment>
                    {currentComment}
                </Comment>
                <TimeStamp>
                    {timeStamp}
                </TimeStamp>
                <ReplyButton videoOwnerID={videoOwnerID} videoID={videoID} commentID={commentID}/>        
                {auth().currentUser && auth().currentUser.uid !== userID &&  <BlockButton userID={userID}/>}
            </CommentContainer>                     
            <CommentReplies videoOwnerID={videoOwnerID} videoID={videoID} commentID={commentID}/>
        </Container>
        )
}

export default memo(DisplayComment);