import React from 'react';
import {Text, View} from 'react-native';
import {db} from '~/Firebase'
import {collection} from 'firebase/firestore';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {
        Container,
        ReplyContainer,
        ReplyOwnerImage,
        ReplyOwner,
        Reply,
        TimeStamp
    } from './styles.js';

function CommentReplies({userID, commentID, videoID}){
    const repliesRef = collection(db, `${userID}/${videoID}/commentSection/${commentID}/commentReplies`);
    const [replies, loading, error] = useCollectionData(repliesRef);

    return loading ? 
        <Text>Loading...</Text> : 
        <Container>{
            replies.map((reply) => {
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
            })}        
        </Container>

        
}

export default CommentReplies;