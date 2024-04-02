import React from 'react';
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

function DisplayComment({comment}) {
    const userImage = comment.userImage;
    const userName = comment.username;
    const timeStamp = comment.timeStamp
    const commentID = comment.commentID;
    const currentComment = comment.comment;

    return(                        
        <Container key={commentID}>
            <CommentContainer>
                <View style={{width: '50px', display: 'flex', gap: 15}}>
                    <CommentOwnerImage
                        source={{uri: userImage}}
                    />
                    <CommentOwnerName>
                        {userName}
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