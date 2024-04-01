import React from 'react';
import {View, Text} from 'react-native';
import CommentReplies from './CommentReplies';
import {collection} from 'firebase/firestore';
import {db} from '~/Firebase'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import {
        MainContainer, 
        Container,
        NoCommentsContainer, 
        NoComments, 
        CommentContainer,
        CommentOwnerImage,
        CommentOwnerName,
        Comment,
        TimeStamp,
        ReplyButton,
        ButtonText,
    } from './styles.js';

function CommentSection({userID, videoID}) {
    const allCommentsRef = collection(db, `${userID}/${videoID}/commentSection`);
    const [allComments, loading, error] = useCollectionData(allCommentsRef);

    return loading ? <Text>loading</Text> : 
            !allComments.length ? (
                    <NoCommentsContainer> 
                        <NoComments>
                            No Comments
                        </NoComments>
                    </NoCommentsContainer> 
                ) : (
            <MainContainer>
                {allComments.map((comment) => {
                    let userImage = comment.userImage;
                    let userName = comment.username;
                    let timeStamp = comment.timeStamp
                    let commentID = comment.commentID;
                    let currentComment = comment.comment;
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
                            <CommentReplies userID={userID} videoID={videoID} commentID={commentID}/>
                        </Container>
                    )
                })}
            </MainContainer>                    
            )


    
}

export default CommentSection;