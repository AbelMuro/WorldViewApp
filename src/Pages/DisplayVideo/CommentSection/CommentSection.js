import React, {lazy, memo, useEffect,useState} from 'react';
import CircularLoadingBar from '~/Components/CircularLoadingBar';
import {
        MainContainer,
        NoCommentsContainer, 
        NoComments, 
} from './styles.js';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
const DisplayComment = lazy(() => import('./DisplayComment'));

function CommentSection({videoID, videoOwnerID}) {
    const [allComments, setAllComments] = useState([]);
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
            .collection(`${videoOwnerID}/${videoID}/commentSection`).orderBy('order', 'desc')
            .onSnapshot((snapshot) => {
                    setLoading(true);        
                    let comments = [];
                    snapshot.forEach((doc) => {
                        let comment = doc.data();
                        if(blockedUsers.includes(comment.userID)) return;

                        comments.push(
                            <DisplayComment 
                                comment={comment} 
                                key={comment.commentID} 
                                userID={comment.userID}                     //this is needed to get user info from the person who posted the comment
                                videoID={videoID}                           //this is needed to get the collection
                                videoOwnerID={videoOwnerID}                 //this is needed to get the collection
                            />
                        )
                    })
                    setAllComments(comments);
                    setLoading(false);              
            });   
    }, [videoID, videoOwnerID, blockedUsers])

    return loading ? <CircularLoadingBar/> : 
            !allComments.length ? (
                    <NoCommentsContainer> 
                        <NoComments>
                            No Comments
                        </NoComments>
                    </NoCommentsContainer> 
                ) : (
            <MainContainer>
                {allComments}
            </MainContainer>                    
        )


    
}

export default memo(CommentSection);