import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {
    Container,
    CommentContainer,
    CommentOwnerImage,
    CommentOwnerName,
    Comment,
    TimeStamp,
    ReplyButton,
    ButtonText,
} from './styles.js';
import CommentReplies from './CommentReplies';
import firestore from '@react-native-firebase/firestore';


//i will need to implement the functionality for the reply button
function DisplayComment({comment, userID}) {
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
        <Container key={commentID}>
            <CommentContainer>
                <View style={{width: '50px', display: 'flex', gap: 15}}>
                    <CommentOwnerImage
                        source={{uri: userInfo.imageURL}}
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
                    <ReplyButton>
                        <ButtonText>
                            Reply
                        </ButtonText>
                    </ReplyButton>                                
            </CommentContainer>                     
            <CommentReplies commentID={commentID}/>
        </Container>
        )
}

export default DisplayComment