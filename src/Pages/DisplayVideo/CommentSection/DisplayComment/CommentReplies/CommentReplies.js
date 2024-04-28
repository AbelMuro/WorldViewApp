import React, {memo, lazy, useEffect, useState} from 'react';
import {Container} from './styles.js';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
const DisplayReply = lazy(() => import('./DisplayReply'));

function CommentReplies({commentID, videoID, videoOwnerID}){
    const [allReplies, setAllReplies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [blockedUsers, setBlockedUsers] = useState([]);

    useEffect(() => {
        if(!auth().currentUser) return;
        let uid = auth().currentUser.uid;

        firestore().collection(`${uid}/userInfo/BlockedUsers`).onSnapshot((snapshot) => {
            let users = []
            snapshot.forEach((doc) => {
                let blockedUser = doc.id;
                users.push(blockedUser);
            })
            setBlockedUsers(users);
        })   
    }, [])

    useEffect(() => {
        firestore()
            .collection(`${videoOwnerID}/${videoID}/commentSection/${commentID}/commentReplies`).orderBy('order', 'desc')
            .onSnapshot((snapshot) => {
                    setLoading(true);        
                    let replies = [];
                    snapshot.forEach((doc) => {
                        let reply = doc.data();
                        if(blockedUsers.includes(reply.userID)) return;
                        replies.push(
                            <DisplayReply reply={reply} key={reply.commentID} userID={reply.userID} />
                        )
                    })
                    setAllReplies(replies);
                    setLoading(false);              
            });   
    }, [videoID, videoOwnerID, blockedUsers])


    return loading ? 
        <></> : 
        <Container>
            {allReplies}      
        </Container>

        
}

export default memo(CommentReplies);