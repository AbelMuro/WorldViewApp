import React, {memo, lazy, useEffect, useState} from 'react';
import {Container} from './styles.js';
import firestore from '@react-native-firebase/firestore';
const DisplayReply = lazy(() => import('./DisplayReply'));

function CommentReplies({commentID, videoID, userID}){
    const [allReplies, setAllReplies] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        firestore()
            .collection(`${userID}/${videoID}/commentSection/${commentID}/commentReplies`).orderBy('order', 'desc')
            .onSnapshot((snapshot) => {
                    setLoading(true);        
                    let replies = [];
                    snapshot.forEach((doc) => {
                        let reply = doc.data();
                        replies.push(
                            <DisplayReply reply={reply} key={reply.commentID} userID={reply.userID}/>
                        )
                    })
                    setAllReplies(replies);
                    setLoading(false);              
            });   
    }, [videoID, userID])


    return loading ? 
        <></> : 
        <Container>
            {allReplies}      
        </Container>

        
}

export default memo(CommentReplies);