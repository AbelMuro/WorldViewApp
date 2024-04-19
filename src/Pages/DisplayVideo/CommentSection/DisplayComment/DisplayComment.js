import React, {useEffect, useState} from 'react';
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
import ReplyButton from './ReplyButton';
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

    return(                        
        <Container>
            <CommentContainer>
                <View style={{width: '50px', display: 'flex', gap: 15}}>
                    <CommentOwnerImage
                        source={userInfo.imageURL ? {uri: userInfo.imageURL} : icons['emptyAvatar']}
                    />
                    <CommentOwnerName>
                        {userInfo.username}
                    </CommentOwnerName>                                
                </View>
                <Comment>
                    {currentComment}
                </Comment>
                <TimeStamp>
                    {timeStamp}
                </TimeStamp>
                <ReplyButton videoID={videoID} commentID={commentID} videoOwnerID={videoOwnerID}/>                         
            </CommentContainer>                     
            <CommentReplies videoOwnerID={videoOwnerID} videoID={videoID} commentID={commentID}/>
        </Container>
        )
}

export default DisplayComment