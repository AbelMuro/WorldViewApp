import React, {lazy, memo, useMemo, useEffect,useState} from 'react';
import CircularLoadingBar from '~/Components/CircularLoadingBar';
import {collection} from 'firebase/firestore';
import {db} from '~/Firebase'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import {
        MainContainer,
        NoCommentsContainer, 
        NoComments, 
} from './styles.js';
import { useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
const DisplayComment = lazy(() => import('./DisplayComment'));


function CommentSection({videoID, videoOwnerID}) {
    const [allComments, setAllComments] = useState([]);
    const [loading, setLoading] = useState(false);
    

    useEffect(() => {
        firestore()
            .collection(`${videoOwnerID}/${videoID}/commentSection`).orderBy('order', 'desc')
            .onSnapshot((snapshot) => {
                    setLoading(true);        
                    let comments = [];
                    snapshot.forEach((doc) => {
                        let comment = doc.data();
                        comments.push(
                            <DisplayComment 
                                comment={comment} 
                                key={comment.commentID} 
                                userID={comment.userID}             //this is needed to get user info from the person who posted the comment
                                videoID={videoID}                   //this is needed to get the collection
                                videoOwnerID={videoOwnerID}               //this is needed to get the collection
                            />
                        )
                    })
                    setAllComments(comments);
                    setLoading(false);              
            });   
    }, [videoID, videoOwnerID])


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