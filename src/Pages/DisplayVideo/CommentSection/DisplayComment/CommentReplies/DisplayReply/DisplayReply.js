import React from 'react';
import {View} from 'react-native';
import {
    ReplyContainer,
    ReplyOwnerImage,
    ReplyOwner,
    Reply,
    TimeStamp
} from './styles.js';

function DisplayReply({reply}) {
    const comment = reply.comment;
    const commentID = reply.commentID;
    const timeStamp = reply.timeStamp;
    const userImage = reply.userImage;
    const userName = reply.username;

    return(
        <ReplyContainer key={commentID}>
            <View style={{display: 'flex', gap: 10}}>
                <ReplyOwnerImage 
                    source={{uri: userImage}}/>
                <ReplyOwner>
                    {userName}
                </ReplyOwner>                            
            </View>
            <Reply>
                {comment}
            </Reply>
            <TimeStamp>
                {timeStamp}
            </TimeStamp>
        </ReplyContainer>
    )
}

export default DisplayReply;