import React, {memo, lazy} from 'react';
import {db} from '~/Firebase'
import {collection} from 'firebase/firestore';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {Container} from './styles.js';
import {useSelector} from 'react-redux';
const DisplayReply = lazy(() => import('./DisplayReply'));

function CommentReplies({commentID}){
    const video = useSelector(state => state.video);
    const repliesRef = collection(db, `${video.userID}/${video.videoID}/commentSection/${commentID}/commentReplies`);
    const [replies, loading, error] = useCollectionData(repliesRef);

    return loading ? 
        <></> : 
        <Container>{
            replies.map((reply) => {
                return(
                    <DisplayReply reply={reply} />
                )
            })}        
        </Container>

        
}

export default memo(CommentReplies);